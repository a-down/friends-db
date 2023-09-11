// notificationModel.js

const mongoose = require('mongoose');




const notificationSchema = new mongoose.Schema({
  content: String,          // Notification content
  recipient: String,        // User ID of the recipient
  post: String,             // Post ID related to the notification
  read: { type: Boolean, default: false }, // Whether the notification has been read
}, { timestamps: true });    // Add timestamps for createdAt and updatedAt

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
