
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); // Import your notification controller

// Define routes for notification-related operations
router.get('/api/notifications', notificationController.getNotifications);
router.put('/api/notifications/mark-as-read', notificationController.markAsRead);
// Add more routes as needed

module.exports = router;
