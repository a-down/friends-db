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
const commentModel = mongoose.model('Comment', commentSchema);
  export default commentModel;
