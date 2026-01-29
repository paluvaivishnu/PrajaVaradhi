const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
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
        enum: ['issue_update', 'status_change', 'new_comment', 'scheme_alert', 'budget_update', 'system'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    actionUrl: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: '🔔'
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

// Mark notification as read
notificationSchema.methods.markAsRead = function () {
    this.isRead = true;
    this.readAt = new Date();
    return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);
