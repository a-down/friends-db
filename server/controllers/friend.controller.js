const { User } = require('../models');
const { ObjectId } = require('mongodb');


// Updates/Creates a subdoc in each User referencing who sent the req
async function addFriend(criteria = {}) {
  const { id, toUser } = criteria
  try {
    const payload = await User.findOneAndUpdate({ _id: id },
      {
        friendRequest:
          { fromUser: id, toUser: toUser },
      })
    const payload2 = await User.findByIdAndUpdate({ _id: toUser },
      {
        friendRequest:
          { fromUser: id, toUser: toUser },
      })
    return payload
  } catch (err) {
    // if (process.env.NODE_ENV === "development") 
    console.log(err)
    throw new Error(err)
  }
}

// This can be narrowed down to populating only the objs that match toUser:id
async function pendingFriend(id) {
  console.log(id)
  try {
    const payload = await User.findById(id).populate({ path: 'friendRequestSchema' })
      return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// {
//   friendRequest:
//     { toUser: id }
// }




async function removeFriend(id) {
  try {
    const payload = await User.findByIdAndDelete(id)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}
module.exports = {
  removeFriend,
  addFriend,
  pendingFriend,
}

