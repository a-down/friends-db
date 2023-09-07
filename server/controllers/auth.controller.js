const { User } = require('../models');
const { create, find, findOne, findById } = require("./user.controller")
const jwt = require("jsonwebtoken");
require("dotenv").config()

/*
Problem:
  Original functions were looking for emails that wont exist
Solution:
  Changes made to use username instead of email for register and login
*/

function signToken(user){
  return jwt.sign({ username: user.username, id: user._id}, process.env.JWT_SECRET)

  // return jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET)
}

async function register(req) {
  let user 

  try {
    console.log(`HELLO! ${req.body}`)
    user = await User.create(req.body)
  } catch(err){
    if( process.env.NODE_ENV === "development") console.log(err)
    throw err
  }

  const token = signToken(user)

  const { password, ...modifiedUser } = user;
  return { token, user: modifiedUser }
}


async function login(req) {
  let user

  try {
    user = await User.findOne({ username: req.body.username })
    // user = await findOne({ email: req.body.email })
  } catch(err){
    throw new Error(err)
  }

  if( !user ) throw new Error("Could not authenticate")

  const passwordIsValid = await user.verify(req.body.password)
  if( !passwordIsValid ) throw new Error("Could not authenticate")

  const token = signToken(user)

  const { password, ...modifiedUser } = user;
  return { token, user: modifiedUser }
}


async function verify(req){
  const cookie = req.cookies["auth-cookie"]
  if( !cookie ) throw new Error("Could not authenticate")

  const decryptCookie = jwt.verify(cookie, process.env.JWT_SECRET)
  if( !decryptCookie ) throw new Error("Could not authenticate")

  const foundUser = await User.findById(decryptCookie.id)
  if( !foundUser ) throw new Error("Could not authenticate")
  
  return { user:foundUser }
}

module.exports = {
  register,
  login,
  verify
}
