 // Comment Schema 
     
 const mongoose = require('mongoose');

 const commentSchema = new mongoose.Schema({
    text: {
     type: String,
     trim: true,
     required: true
    },
    date: {
     type: Date,
     default: Date.now
     }
    })

  module.exports = mongoose.model('Comment', commentSchema); 
