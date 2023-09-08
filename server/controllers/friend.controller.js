const { User } = require('../models');
const { ObjectId } = require('mongodb');

async function find(criteria = {}) {
  try {
    const payload = await User.find(criteria)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

async function addFriend(criteria = {}) {
  const { id, toUser } = criteria
  try {
    const payload = await User.findOneAndUpdate({_id:id},
      {friendRequest:
        { fromUser: id, toUser: toUser },
      } 
    )
    return payload
  } catch (err) {
    // if (process.env.NODE_ENV === "development") 
    console.log(err)
    throw new Error(err)
  }
}
/**
 * {
        _id: id
      },
      {
        $set: {"friendRequest.$.toUser": new ObjectId(toUser)}
      },
 * 
 */


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
}

