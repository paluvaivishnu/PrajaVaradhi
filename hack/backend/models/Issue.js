const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        default: ''
    },
    userPhone: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Action', 'Resolved'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    tag: {
        type: String,
        default: ''
    },
    photos: [{
        type: String
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedDate: {
        type: Date
    },
    resolvedDate: {
        type: Date
    },
    resolutionNotes: {
        type: String,
        default: ''
    },
    viewCount: {
        type: Number,
        default: 0
    },
    upvotes: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Issue', issueSchema);
