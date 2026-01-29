const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide scheme name'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please provide scheme description'],
        trim: true
    },
    category: {
        type: String,
        enum: ['Agriculture', 'Education', 'Health', 'Infrastructure', 'Social Welfare', 'Women Empowerment', 'Employment', 'Housing', 'Other'],
        default: 'Other'
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    eligibilityCriteria: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    applicationProcess: {
        type: String,
        default: ''
    },
    documentsRequired: [{
        type: String
    }],
    budgetAllocated: {
        type: Number,
        default: 0
    },
    budgetUtilized: {
        type: Number,
        default: 0
    },
    targetBeneficiaries: {
        type: Number,
        default: 0
    },
    beneficiariesEnrolled: {
        type: Number,
        default: 0
    },
    officialWebsite: {
        type: String,
        default: ''
    },
    contactNumber: {
        type: String,
        default: ''
    },
    contactEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    districts: [{
        type: String
    }],
    ageLimit: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    incomeLimit: {
        type: Number,
        default: 0
    },
    applicationDeadline: {
        type: Date
    },
    icon: {
        type: String,
        default: '📋'
    },
    tags: [{
        type: String
    }],
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
schemeSchema.index({ name: 1, category: 1, isActive: 1 });
schemeSchema.index({ districts: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);
