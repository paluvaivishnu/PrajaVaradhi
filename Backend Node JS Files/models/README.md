# MongoDB Models Documentation

## Overview
This directory contains all MongoDB models for the PrajaVaradhi platform. Each model is designed to support the citizen engagement and government transparency features of the application.

---

## Models

### 1. **User Model** (`User.js`)
Manages user authentication and profiles for both citizens and administrators.

**Key Fields:**
- `name`, `email`, `phone` - Basic user information
- `password` - Hashed password (bcrypt)
- `role` - 'citizen' or 'admin'
- `district`, `address` - Location information
- `profilePicture` - Optional profile image URL
- `isActive` - Account status
- `lastLogin` - Track user activity

**Methods:**
- `matchPassword(enteredPassword)` - Compare password for login

**Indexes:**
- Unique: `email`, `phone`

---

### 2. **Issue Model** (`Issue.js`)
Tracks citizen complaints and requests for government action.

**Key Fields:**
- `id` - Unique issue identifier (e.g., "ISS001")
- `userId` - Reference to User who created the issue
- `userName`, `userPhone` - Cached user info for quick access
- `district`, `category`, `location` - Issue classification
- `title`, `details` - Issue description
- `status` - Pending, In Action, Resolved
- `priority` - Low, Medium, High, Critical
- `tag` - Admin assigned tag
- `photos[]` - Image URLs for evidence
- `assignedTo` - Admin user assigned to handle
- `resolutionNotes` - Notes on how issue was resolved
- `viewCount`, `upvotes` - Engagement metrics

**Indexes:**
- Unique: `id`
- References: `userId`, `assignedTo` → User

---

### 3. **Scheme Model** (`Scheme.js`)
Government welfare schemes and programs.

**Key Fields:**
- `name`, `description` - Scheme details
- `category` - Agriculture, Education, Health, etc.
- `department` - Responsible government department
- `eligibilityCriteria` - Who can apply
- `benefits` - What beneficiaries receive
- `applicationProcess` - How to apply
- `documentsRequired[]` - List of required documents
- `budgetAllocated`, `budgetUtilized` - Financial tracking
- `targetBeneficiaries`, `beneficiariesEnrolled` - Impact metrics
- `districts[]` - Where scheme is available
- `ageLimit`, `incomeLimit` - Eligibility constraints
- `startDate`, `endDate`, `applicationDeadline` - Timing
- `isActive` - Current scheme status
- `officialWebsite`, `contactNumber`, `contactEmail` - Contact info

**Indexes:**
- `name`, `category`, `isActive`
- `districts`

---

### 4. **Budget Model** (`Budget.js`)
Government budget allocation and expenditure tracking.

**Key Fields:**
- `year` - Fiscal year (e.g., "2025-26")
- `department` - Government department
- `category` - Infrastructure, Education, Health, etc.
- `projectName`, `description` - Project details
- `allocatedAmount`, `spentAmount`, `remainingAmount` - Financial data
- `utilizationPercentage` - Auto-calculated spending %
- `district`, `constituency` - Geographic location
- `status` - Proposed, Approved, In Progress, Completed, etc.
- `priority` - Project priority level
- `startDate`, `expectedEndDate`, `actualEndDate` - Timeline
- `beneficiaries` - Number of people impacted
- `physicalProgress`, `financialProgress` - Progress percentages
- `contractorName`, `contractorContact` - Contractor info
- `sanctionOrderNumber`, `sanctionDate` - Approval details
- `milestones[]` - Project checkpoints with status
- `documents[]` - Related files and orders
- `isPublic` - Whether publicly visible
- `viewCount` - Transparency metric

**Pre-save Hook:**
- Auto-calculates `remainingAmount` and `utilizationPercentage`

**Indexes:**
- `year`, `department`
- `district`, `status`
- `category`

---

### 5. **Notification Model** (`Notification.js`)
User notifications for updates and alerts.

**Key Fields:**
- `userId` - Recipient user
- `issueId` - Related issue (if applicable)
- `type` - issue_update, status_change, scheme_alert, etc.
- `title`, `message` - Notification content
- `isRead` - Read status
- `priority` - low, medium, high
- `actionUrl` - Link to related page
- `icon` - Display icon
- `metadata` - Additional data
- `readAt` - When user read it

**Methods:**
- `markAsRead()` - Mark notification as read

**Indexes:**
- `userId`, `isRead`
- `createdAt` (descending)

---

### 6. **Feedback Model** (`Feedback.js`)
Citizen feedback and platform suggestions.

**Key Fields:**
- `userId` - User providing feedback
- `issueId` - Related issue (optional)
- `type` - issue_feedback, platform_feedback, suggestion, complaint
- `rating` - 1-5 star rating
- `subject`, `message` - Feedback content
- `category` - Service Quality, Response Time, etc.
- `status` - Pending, Reviewed, Acknowledged, Implemented, Rejected
- `adminResponse` - Response from admin
- `respondedBy`, `respondedAt` - Who responded and when
- `isPublished` - Whether to show publicly
- `isAnonymous` - Hide user identity
- `tags[]` - Classification tags

**Indexes:**
- `userId`
- `issueId`
- `rating`
- `status`

---

### 7. **Analytics Model** (`Analytics.js`)
Platform statistics and metrics aggregation.

**Key Fields:**
- `date` - Date of analytics snapshot
- `type` - daily, weekly, monthly, yearly

**User Metrics:**
- `totalUsers`, `newUsers`, `activeUsers`

**Issue Metrics:**
- `totalIssues`, `newIssues`, `pendingIssues`, `inActionIssues`, `resolvedIssues`
- `issuesByCategory` - Map of category → count
- `issuesByDistrict` - Map of district → count
- `averageResolutionTime` - In hours

**Scheme Metrics:**
- `totalSchemes`, `activeSchemes`, `totalBeneficiaries`

**Budget Metrics:**
- `totalBudgetAllocated`, `totalBudgetUtilized`, `budgetUtilizationPercentage`

**Feedback Metrics:**
- `totalFeedback`, `averageRating`

**Engagement Metrics:**
- `totalPageViews`, `totalSessionDuration`
- `averageFirstResponseTime`
- `notificationsSent`

**Top Lists:**
- `topCategories[]` - Most common issue categories
- `topDistricts[]` - Districts with most issues

**Indexes:**
- `date`, `type` (unique combination)
- `type`

---

## Relationships

```
User (1) ──── (N) Issue
User (1) ──── (N) Notification
User (1) ──── (N) Feedback
Issue (1) ──── (N) Notification
Issue (1) ──── (N) Feedback
User (Admin) ──── (N) Issue (assignedTo)
User (Admin) ──── (N) Feedback (respondedBy)
```

---

## Usage Examples

### Creating a User
```javascript
const User = require('./models/User');

const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    password: 'securepassword',
    district: 'Visakhapatnam',
    role: 'citizen'
});
```

### Creating an Issue
```javascript
const Issue = require('./models/Issue');

const issue = await Issue.create({
    id: 'ISS001',
    userId: user._id,
    userName: user.name,
    userPhone: user.phone,
    district: 'Visakhapatnam',
    category: 'Roads',
    title: 'Pothole on Main Street',
    location: 'Main Street, Near School',
    details: 'Large pothole causing accidents',
    priority: 'High'
});
```

### Querying with Population
```javascript
// Get issues with user details
const issues = await Issue.find()
    .populate('userId', 'name email phone')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });

// Get user with their issues
const user = await User.findById(userId);
const userIssues = await Issue.find({ userId: user._id });
```

### Creating Analytics
```javascript
const Analytics = require('./models/Analytics');

const analytics = await Analytics.create({
    date: new Date(),
    type: 'daily',
    totalUsers: 1500,
    newUsers: 45,
    activeUsers: 320,
    totalIssues: 850,
    pendingIssues: 120,
    resolvedIssues: 680,
    averageResolutionTime: 48.5,
    issuesByCategory: {
        'Roads': 250,
        'Water': 180,
        'Electricity': 140,
        'Sanitation': 100
    }
});
```

---

## Best Practices

1. **Always use `await` or `.then()` with model methods**
2. **Validate data before saving** - Use Mongoose built-in validators
3. **Use `populate()` for references** - Don't manually join data
4. **Create indexes** - For fields you query frequently
5. **Use `lean()` for read-only queries** - Better performance
6. **Handle errors properly** - Use try-catch blocks
7. **Use transactions** - For multi-document updates
8. **Sanitize user input** - Prevent injection attacks

---

## Environment Setup

Ensure MongoDB connection is configured in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/prajavaradhi
```

---

## Testing Models

You can test models in the Node REPL:
```bash
node
```

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/prajavaradhi');

// Test user creation
const testUser = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    phone: '9999999999',
    password: 'test123'
});

console.log(testUser);
```

---

## Migration Notes

If you're migrating from localStorage to MongoDB:
1. Export localStorage data to JSON
2. Transform data to match schema
3. Use `Model.insertMany()` for bulk import
4. Verify data integrity
5. Update frontend to use API endpoints

---

## Contributing

When adding new fields:
1. Update the model file
2. Update this documentation
3. Add migrations if needed
4. Update API endpoints
5. Update frontend code

---

**Last Updated:** January 2026
**Version:** 1.0.0
