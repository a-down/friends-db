const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
},
password: {
    type: String,
    required: true,
},
friendsId: {
    type: String,
    ref: 'user',
    required: true,
},
userId: {
    type: String,
    ref: 'user',
    required: true,
},
profileSettings: {
  type: String,
  ref: 'user',
  required: true,
}
});

userSchema.method("verify", async function(pw){
  return await bcrypt.compare(pw, this.password)
})

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = model('User', userSchema);
module.exports = User;
