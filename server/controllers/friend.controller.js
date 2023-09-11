const { User } = require('../models');
const { ObjectId } = require('mongodb');
const { findByIdAndUpdate } = require('../models/User');

/* 
Updates/Creates a subdoc in each User referencing who sent the req
 this needs cleanup -- awaits should call the findbyidandupdate method, can update later
this may need to check if requester already has reciever in the friends db.
 */
async function addFriend(criteria = {}) {
  const { id, toUser } = criteria
  try {
    const requesterDoc = await User.findOneAndUpdate({ _id: id },
      {
        friendRequest:
        {
          fromUser: id, toUser: toUser
        },
      })
    const recieverDoc = await User.findByIdAndUpdate({ _id: toUser },
      {
        friendRequest:
        {
          fromUser: id, toUser: toUser
        },
      })
    return requesterDoc
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// This can be narrowed down to populating only the objs that match toUser:id
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
/*
Save this for Pat, delete for production
 {
   friendRequest:
     { toUser: id }
 }
*/


/**
 * clean up, this can be refactored to somehow pull the friendRequest in the initial User
 * 
 */
async function confirmFriend(criteria = {}) {
  const { id, fromUser, confirm } = criteria
  console.log(id, fromUser, confirm)
  let recieverDoc
  try {
    console.log(confirm)
    if (confirm === true) {
      recieverDoc = await User.findByIdAndUpdate(id, {
        friends: fromUser
      },
        // { Del**this is trying to destroy the friendrequest record**Del
        //   $pull: {friendRequest: {toUser:id, fromUser:fromUser}}
        // }
      );
      const requesterDoc = await User.findByIdAndUpdate(fromUser, {
        friends: id
      })
    }
    const destroyReciever = await User.updateOne({ _id: id },
      {
        $pull:
        {
          friendRequest:
            { "fromUser": fromUser }
        }
      }
    )
    const destroyRequester = await User.updateOne({ _id: fromUser },
      {
        $pull:
        {
          friendRequest:
            { "toUser": id }
        }
      }
    )

    return recieverDoc
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


// This will be the same as pendingFriend however if used as pendingFriend is written it will destroy the entire User doc. Need to find a way to narrow search to a single doc in the friendRequestSchema. check deleteComment function, maybe ideas in there
async function deleteFriend(criteria) {
  const { id, friendId } = criteria
  console.log(id, friendId)
  try {
    const payload = await User.updateOne({ _id: id },
      {
        $pull:
          { "friends": friendId }
      }
    )
    const payload2 = await User.updateOne({ _id: friendId },
      {
        $pull:
          { "friends": id }
      }
    )
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
}

