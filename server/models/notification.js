// notificationModel.js

const mongoose = require('mongoose');




const notificationSchema = new mongoose.Schema({
  content: String,          // Notification content
  recipient: String,        // User ID of the recipient
  post: String,             // Post ID related to the notification
  read: { type: Boolean, default: false }, // Whether the notification has been read
  
  content: String,           // Notification content
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',             // Reference to the User model
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',             // Reference to the User model
  },
  type: String,              // Notification type (e.g., message, comment, friend)
  read: { type: Boolean, default: false },
}, { timestamps: true });    // Add timestamps for createdAt and updatedAt


const Notification = mongoose.model('Notification', notificationSchema);

// notificationModel.js




 





module.exports = Notification;
