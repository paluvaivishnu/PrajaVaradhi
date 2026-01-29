const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true,
        default: 'daily'
    },

    // User Statistics
    totalUsers: {
        type: Number,
        default: 0
    },
    newUsers: {
        type: Number,
        default: 0
    },
    activeUsers: {
        type: Number,
        default: 0
    },

    // Issue Statistics
    totalIssues: {
        type: Number,
        default: 0
    },
    newIssues: {
        type: Number,
        default: 0
    },
    pendingIssues: {
        type: Number,
        default: 0
    },
    inActionIssues: {
        type: Number,
        default: 0
    },
    resolvedIssues: {
        type: Number,
        default: 0
    },

    // Issue Categories Breakdown
    issuesByCategory: {
        type: Map,
        of: Number,
        default: new Map()
    },

    // Issue by District
    issuesByDistrict: {
        type: Map,
        of: Number,
        default: new Map()
    },

    // Resolution Metrics
    averageResolutionTime: {
        type: Number, // in hours
        default: 0
    },

    // Scheme Statistics
    totalSchemes: {
        type: Number,
        default: 0
    },
    activeSchemes: {
        type: Number,
        default: 0
    },
    totalBeneficiaries: {
        type: Number,
        default: 0
    },

    // Budget Statistics
    totalBudgetAllocated: {
        type: Number,
        default: 0
    },
    totalBudgetUtilized: {
        type: Number,
        default: 0
    },
    budgetUtilizationPercentage: {
        type: Number,
        default: 0
    },

    // Feedback Statistics
    totalFeedback: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },

    // Platform Engagement
    totalPageViews: {
        type: Number,
        default: 0
    },
    totalSessionDuration: {
        type: Number, // in minutes
        default: 0
    },

    // Response Time Metrics
    averageFirstResponseTime: {
        type: Number, // in hours
        default: 0
    },

    // Notifications
    notificationsSent: {
        type: Number,
        default: 0
    },

    // Top Categories
    topCategories: [{
        name: String,
        count: Number
    }],

    // Top Districts
    topDistricts: [{
        name: String,
        count: Number
    }]
}, {
    timestamps: true
});

// Indexes
analyticsSchema.index({ date: -1, type: 1 });
analyticsSchema.index({ type: 1 });

// Ensure unique entry per date and type
analyticsSchema.index({ date: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
