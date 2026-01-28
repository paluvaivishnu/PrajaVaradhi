const Issue = require('../models/Issue');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public (but filtered by district for admins)
exports.getAllIssues = async (req, res) => {
    try {
        let query = {};

        // If user is authenticated and is a district admin, filter by their district
        if (req.user && req.user.role === 'admin' && req.user.district) {
            query.district = req.user.district;
        }

        const issues = await Issue.find(query).populate('userId', 'name email').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: issues.length,
            data: issues
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Public
exports.getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('userId', 'name email phone');

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        res.status(200).json({
            success: true,
            data: issue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get issues by user ID
// @route   GET /api/issues/user/:userId
// @access  Private
exports.getUserIssues = async (req, res) => {
    try {
        const issues = await Issue.find({ userId: req.params.userId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: issues.length,
            data: issues
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
exports.createIssue = async (req, res) => {
    try {
        const { district, category, title, location, details, priority } = req.body;

        // User from authenticated token (protect middleware)
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Generate customized issue ID (e.g., VIS-20250128-1234)
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        // Use first 3 chars of district or default to AP
        const distCode = (district || 'AP').substring(0, 3).toUpperCase();
        const issueId = `${distCode}-${dateStr}-${randomNum}`;

        const issue = await Issue.create({
            id: issueId,
            userId: user._id,
            userName: user.name,      // Embed basic user info for faster read
            userPhone: user.phone,    // Embed basic user info
            district,
            category,
            title,
            location,
            details,
            priority: priority || 'Medium',
            status: 'Pending'
        });

        res.status(201).json({
            success: true,
            data: issue
        });

    } catch (error) {
        console.error("Create Issue Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update issue status
// @route   PUT /api/issues/:id
// @access  Private (Admin)
exports.updateIssue = async (req, res) => {
    try {
        const { status, tag, priority, resolutionNotes } = req.body;

        const updateData = {
            status,
            tag,
            priority,
            resolutionNotes
        };

        // If status is changed to Resolved, set the date
        if (status === 'Resolved') {
            updateData.resolvedDate = Date.now();
        }

        // If status is changed to In Action or others, set assigned fields if not already set
        // (Assuming the admin updating it is assigning it to themselves or just handling it)
        if (status === 'In Action' && !req.body.assignedTo) {
            updateData.assignedTo = req.user._id;
            updateData.assignedDate = Date.now();
        }

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        res.status(200).json({
            success: true,
            data: issue
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

