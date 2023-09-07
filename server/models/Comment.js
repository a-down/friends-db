 // Comment Schema 
     
 const mongoose = require('mongoose');

 const commentSchema = new mongoose.Schema({
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
    },  
    commentText: {
     type: String,
     trim: true,
     required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
     type: Date,
     default: Date.now
     }
    })
const Comment = mongoose.model('Comment', commentSchema);
  export default Comment; 
