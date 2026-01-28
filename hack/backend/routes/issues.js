const express = require('express');
const router = express.Router();
const { getAllIssues, createIssue, updateIssue, getUserIssues, getIssueById } = require('../controllers/issueController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.get('/', protect, getAllIssues);  // Now protected to filter by district
router.get('/:id', getIssueById);

// Protected routes (require authentication)
router.post('/', protect, createIssue);
router.get('/user/:userId', protect, getUserIssues);

// Admin only routes
router.put('/:id', protect, authorize('admin'), updateIssue);

module.exports = router;
