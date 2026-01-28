const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    year: {
        type: String,
        required: [true, 'Please provide fiscal year'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Please provide department name'],
        trim: true
    },
    category: {
        type: String,
        enum: ['Infrastructure', 'Education', 'Health', 'Agriculture', 'Social Welfare', 'Transport', 'Utilities', 'Administration', 'Other'],
        default: 'Other'
    },
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    allocatedAmount: {
        type: Number,
        required: [true, 'Please provide allocated amount'],
        min: 0
    },
    spentAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    remainingAmount: {
        type: Number,
        default: function () {
            return this.allocatedAmount - this.spentAmount;
        }
    },
    utilizationPercentage: {
        type: Number,
        default: function () {
            if (this.allocatedAmount === 0) return 0;
            return ((this.spentAmount / this.allocatedAmount) * 100).toFixed(2);
        }
    },
    district: {
        type: String,
        trim: true
    },
    constituency: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Proposed', 'Approved', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
        default: 'Proposed'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    startDate: {
        type: Date,
        required: true
    },
    expectedEndDate: {
        type: Date,
        required: true
    },
    actualEndDate: {
        type: Date
    },
    beneficiaries: {
        type: Number,
        default: 0
    },
    physicalProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    financialProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    contractorName: {
        type: String,
        trim: true
    },
    contractorContact: {
        type: String,
        trim: true
    },
    sanctionOrderNumber: {
        type: String,
        trim: true
    },
    sanctionDate: {
        type: Date
    },
    remarks: {
        type: String,
        default: ''
    },
    documents: [{
        name: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    milestones: [{
        name: String,
        targetDate: Date,
        completionDate: Date,
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed', 'Delayed'],
            default: 'Pending'
        }
    }],
    isPublic: {
        type: Boolean,
        default: true
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for faster queries
budgetSchema.index({ year: 1, department: 1 });
budgetSchema.index({ district: 1, status: 1 });
budgetSchema.index({ category: 1 });

// Pre-save middleware to calculate remaining amount and percentages
budgetSchema.pre('save', function (next) {
    this.remainingAmount = this.allocatedAmount - this.spentAmount;
    if (this.allocatedAmount > 0) {
        this.utilizationPercentage = ((this.spentAmount / this.allocatedAmount) * 100);
    }
    next();
});

module.exports = mongoose.model('Budget', budgetSchema);
