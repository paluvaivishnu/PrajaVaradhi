const Issue = require('../models/Issue');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public (but filtered by district for admins)
exports.getAllIssues = async (req, res) => {
    try {
        let query = {};

        // If user is a district admin (Public Representative), only show verified, non-duplicate issues
        if (req.user && req.user.role === 'admin') {
            query.isVerified = true;
            query.isDuplicate = false;

            if (req.user.district) {
                query.district = req.user.district;
            }
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

// @desc    Add progress update to an issue
// @route   POST /api/issues/:id/progress
// @access  Private (admin only)
exports.addProgressUpdate = async (req, res) => {
    try {
        const { comment, photo } = req.body;

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: 'Comment is required'
            });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        // Add progress update
        const progressUpdate = {
            comment,
            photo: photo || '',
            updatedBy: req.user.name || 'Public Representative',
            updatedAt: new Date()
        };

        issue.progressUpdates.push(progressUpdate);
        await issue.save();

        res.status(200).json({
            success: true,
            message: 'Progress update added successfully',
            data: issue
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Verify or mark issue as duplicate (Moderator)
// @route   PUT /api/issues/:id/verify
// @access  Private (Moderator)
exports.verifyIssue = async (req, res) => {
    try {
        const { isVerified, moderatorNotes, isDuplicate, duplicateOf } = req.body;

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: 'Issue not found'
            });
        }

        // Update verification fields
        issue.isVerified = isVerified !== undefined ? isVerified : issue.isVerified;
        issue.moderatorNotes = moderatorNotes !== undefined ? moderatorNotes : issue.moderatorNotes;
        issue.isDuplicate = isDuplicate !== undefined ? isDuplicate : issue.isDuplicate;
        issue.duplicateOf = duplicateOf !== undefined ? duplicateOf : issue.duplicateOf;
        issue.verifiedBy = req.user._id;
        issue.verifiedDate = Date.now();

        await issue.save();

        res.status(200).json({
            success: true,
            message: 'Issue verification updated',
            data: issue
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
