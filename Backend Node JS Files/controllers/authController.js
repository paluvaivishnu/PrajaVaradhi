const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password, role, district } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: userExists.email === email
                    ? 'Email already registered'
                    : 'Phone number already registered'
            });
        }

        // Create user with role (default to citizen if not specified)
        const user = await User.create({
            name,
            email,
            phone,
            password,
            role: role || 'citizen',
            district: district || null
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                district: user.district
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, phone, user: username, password } = req.body;

        // Determine identifier (email, phone, or generic 'user' field)
        const identifier = email || phone || username;

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email/phone and password'
            });
        }

        // Check for hardcoded admin credentials (legacy support)
        const admins = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'collector', password: 'gov456', role: 'admin' }
        ];

        // Check against hardcoded admins if the identifier matches a username
        if (identifier === 'admin' || identifier === 'collector') {
            const admin = admins.find(a => a.username === identifier && a.password === password);

            if (admin) {
                const token = generateToken(admin.username);
                return res.status(200).json({
                    success: true,
                    token,
                    user: {
                        _id: 'admin_' + admin.username,
                        name: admin.username === 'admin' ? 'System Administrator' : 'District Collector',
                        email: `${admin.username}@prajavaradhi.gov.in`,
                        role: 'admin'
                    }
                });
            }
        }

        // Find user by email or phone
        // We search by both to be safe, or specific if provided
        const query = {};
        if (email) query.email = email;
        else if (phone) query.phone = phone;
        else query.$or = [{ email: identifier }, { phone: identifier }];

        const user = await User.findOne(query).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordCorrect = await user.matchPassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                district: user.district
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                district: user.district,
                address: user.address,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const { user: identifier } = req.body;

        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with that email/phone'
            });
        }

        // Generate reset token (simple random string for this hack)
        const resetToken = Math.random().toString(36).substring(2, 12);

        // Hash and set to resetPasswordToken field
        user.resetPasswordToken = resetToken;
        // set expire to 10 mins
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        // In a real app, send email here. For now, we return it in response for simulation.
        res.status(200).json({
            success: true,
            message: 'Password reset token generated (Simulated)',
            resetToken // Returning this so we can pretend we got it from email
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const resetToken = req.params.resettoken;

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
