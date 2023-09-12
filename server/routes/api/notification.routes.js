
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); // Import your notification controller

// Define routes for notification-related operations
router.get('/notifications/:userId', async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.params.userId });
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Route to mark a notification as read
  router.put('/notifications/:notificationId/mark-read', async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(req.params.notificationId, { read: true });
      res.json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.delete('/:id', async (req, res) => {

    try {
      const notificationId = req.params.id;
  
      // Find the notification by ID and delete it
      const deletedNotification = await Notification.findByIdAndRemove(notificationId);
      if (!deletedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      return res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  
  });

  module.exports = router;
  
  
