const mongoose = require('mongoose');
const messageSchema = require('./Message')

// Define Chat Schema
const chatSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  chatName: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  messages: [messageSchema]
  
  

});

// Create User model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
