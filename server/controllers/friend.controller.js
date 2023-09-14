const { User } = require('../models');
const { ObjectId } = require('mongodb');
const { findByIdAndUpdate } = require('../models/User');

/* 
Updates/Creates a subdoc in each User referencing who sent the req
 this needs cleanup -- awaits should call the findbyidandupdate method, can update later
this may need to check if requester already has reciever in the friends db.
9/13 updated $push to each friendrequest
 */
async function addFriend(criteria = {}) {
  const { id, toUser } = criteria
  try {
    const requesterDoc = await User.findByIdAndUpdate({ _id: id },
      {
        friendRequest: {
          $push: { fromUser: id, toUser: toUser }
        }
      })
    const recieverDoc = await User.findByIdAndUpdate({ _id: toUser },
      {
        friendRequest: {
          $push: { fromUser: id, toUser: toUser }
        }
      })
    return requesterDoc
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// finds all pending friend requests for a ID This can be narrowed down to populating only the objs that match toUser:id
async function pendingFriend(id) {
  console.log(id)
  try {
    const payload = await User.findById(id).populate(
      {
        path: 'friendRequestSchema'
      }
    )
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// Waits for confirm from friend req and pushes both ids to friend array while destroying friendreq.
async function confirmFriend(criteria = {}) {
  const { id, fromUser, confirm } = criteria
  console.log(id, fromUser, confirm)
  let recieverDoc
  try {
    console.log(confirm)
    if (confirm === true) {
      recieverDoc = await User.findByIdAndUpdate(id, {
        $push: { friends: fromUser }
      });
      const requesterDoc = await User.findByIdAndUpdate(fromUser, {
        $push: { friends: id }
      })
    }
    const destroyReciever = await User.updateOne({ _id: id },
      {
        $pull: {
          friendRequest:
            { "fromUser": fromUser }
        }
      })
    const destroyRequester = await User.updateOne({ _id: fromUser },
      {
        $pull: {
          friendRequest:
            { "toUser": id }
        }
      })
    return recieverDoc
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// Adds user to friend array via follow button
async function followFriend(criteria) {
  const { id, newFriend } = criteria
  let recieverDoc
  try {
    recieverDoc = await User.findByIdAndUpdate(id, {
      $push: { friends: newFriend }
    }, { new: true })
    return recieverDoc
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// Remove from friends array
async function deleteFriend(criteria) {
  const { id, friendId } = criteria
  try {
    const payload = await User.updateOne({ _id: id },
      {
        $pull: {
          "friends": friendId
        }
      })
    const payload2 = await User.updateOne({ _id: friendId },
      {
        $pull: {
          "friends": id
        }
      })
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}
module.exports = {
  deleteFriend,
  addFriend,
  pendingFriend,
  confirmFriend,
  followFriend
}

