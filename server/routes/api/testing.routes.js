const express = require('express');
const router = express.Router();
const Message = require('./messageModel'); // Assuming messageModel.js is in the same directory








//MESSAGE ROUTES TEST


// Create a new message
router.post('/messages', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single message by ID
router.get('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a message by ID
router.delete('/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;






//$push OPERATOR TEST
async function sendMessage(criteria) {
    const { from, to, message } = criteria;
    console.log(from, to, message);
  
    try {
      const newMessage = await Chat.findOneAndUpdate(
        {
          $or: [
            { user1: from, user2: to },
            { user1: to, user2: from }, 
          ],
        },
        {
          // Use $push to add a new message to the messages array
          $push: {
            messages: {
              from: from,
              to: to,
              message: message,
            },
          },
        },
        {
          new: true, 
          upsert: true, 
        }
      );
  
      console.log(newMessage);
      return newMessage;
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.log(err);
      throw new Error(err);
    }
  }



//CHAT SCHEMA TEST 
  
//  const mongoose = require('mongoose');
//
//const chatSchema = new mongoose.Schema({
//  user1: String,
//  user2: String,
//  messages: [
//    {
//      from: String,
//      to: String,
//      message: String,
//    },
//  ],
//});
//
//const Chat = mongoose.model('Chat', chatSchema);
//
//module.exports = Chat;








// STEP:1 notificationModel.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: String,          // Notification content
  recipient: String,        // User ID of the recipient
  post: String,             // Post ID related to the notification
  read: { type: Boolean, default: false }, // Whether the notification has been read
}, { timestamps: true });    // Add timestamps for createdAt and updatedAt

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;







//STEP:2 backend implemations

// Import necessary modules and models
const Comment = require('../models/commentModel');
const Notification = require('../models/notificationModel');

// Handle comment creation
app.post('/api/comments', async (req, res) => {
  try {
    // Create a new comment (assuming you have a Comment model)
    const newComment = new Comment({
      content: req.body.content,
      user: req.body.user,
      post: req.body.post,
    });

    // Save the comment to the database
    await newComment.save();

    // Check if the comment is on another user's post
    const post = await Post.findById(req.body.post); // Assuming you have a Post model
    if (post && post.user !== req.body.user) {
      // Create a notification for the owner of the post
      const notification = new Notification({
        content: `${req.body.user} commented on your post.`,
        recipient: post.user, // User who owns the post
        post: req.body.post,
      });
      await notification.save();
    }

    // Send a success response
    res.status(201).json(newComment);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred.' });
  }
});






//STEP:3 Front end implemations 
//react-toastify (web-browser notifications)
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationComponent = () => {
  // You can manage notifications using state management (e.g., Redux) or hooks
  // When a new notification arrives, call `toast.info` with the notification message
  // and any other options you need.
  
  return (
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
  );
};

export default NotificationComponent;





//STEP:4 notifications if read 
// Update the read status of notifications when a user views them


//app.put('/api/notifications/mark-as-read', async (req, res) => {
//    try {
//      const userId = req.body.userId; // The currently logged-in user's ID
//      await Notification.updateMany(
//        { recipient: userId, read: false },
//        { $set: { read: true } }
//      );
//      res.status(200).json
  






