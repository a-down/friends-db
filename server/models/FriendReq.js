const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  
}, {timestamps:true});


module.exports = friendRequestSchema;