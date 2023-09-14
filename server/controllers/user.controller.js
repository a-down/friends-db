const { User } = require('../models');
const Model = User

// Find user
async function find(criteria = {}) {
  try {
    console.log(criteria)
    const payload = await Model.find(criteria)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// searches by username regex, this doesnt not filter out currUser ID, pass in id and regex as Obj to fix this later
async function searchUser(criteria) {
  const { username } = criteria
  try {
    const payload = await Model.find(
      {
        username:
        {
          $regex: username
        }
      }
    )
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// Not sure if used, findone user
async function findOne(criteria = {}) {
  try {
    const payload = await Model.find(criteria).limit(1)
    return (Array.isArray(payload)) ? payload[0] : payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// find user by ID
async function findById(id) {
  try {
    const payload = await Model.findById(id)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// create user from signup page
async function create(body) {
  try {
    const payload = await Model.create(body)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// update user from edit user settings
async function update(criteria, body) {
  try {
    const payload = await Model.findOneAndUpdate(criteria, body, { new: true })
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// update user settings by id
async function updateById(id, body) {
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true })
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// delete account
async function remove(id) {
  try {
    const payload = await Model.findByIdAndDelete(id)
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

module.exports = {
  find,
  findOne,
  findById,
  create,
  update,
  updateById,
  remove,
  searchUser
}
