const express = require('express');
const router = express.Router();
const { getAllIssues, createIssue, updateIssue, getUserIssues, getIssueById, addProgressUpdate, verifyIssue } = require('../controllers/issueController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.get('/', protect, getAllIssues);  // Now protected to filter by district
router.get('/:id', getIssueById);

// Protected routes (require authentication)
router.post('/', protect, createIssue);
router.get('/user/:userId', protect, getUserIssues);

// Admin only routes
router.put('/:id', protect, authorize('admin'), updateIssue);
router.post('/:id/progress', protect, authorize('admin'), addProgressUpdate);

// Moderator and Admin routes
router.put('/:id/verify', protect, authorize('moderator', 'admin'), verifyIssue);

module.exports = router;
