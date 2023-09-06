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
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User', 
  }],
  profileSettings: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
{timestamps: true}
);


userSchema.method("verify", async function(pw){
  return await bcrypt.compare(pw, this.password)
})

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = model('User', userSchema);
module.exports = User;
