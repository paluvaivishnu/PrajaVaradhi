const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    },
    type: {
        type: String,
        enum: ['issue_feedback', 'platform_feedback', 'suggestion', 'complaint'],
        default: 'platform_feedback',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Service Quality', 'Response Time', 'Resolution Quality', 'Platform Usability', 'Other'],
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Acknowledged', 'Implemented', 'Rejected'],
        default: 'Pending'
    },
    adminResponse: {
        type: String,
        default: ''
    },
    respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    respondedAt: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

// Indexes
feedbackSchema.index({ userId: 1 });
feedbackSchema.index({ issueId: 1 });
feedbackSchema.index({ rating: 1 });
feedbackSchema.index({ status: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
