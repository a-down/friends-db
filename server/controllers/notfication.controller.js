const Notification = require('../models/Notification');
const { ObjectId } = require('mongodb');

// Not sure if this is used
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Get all user notifications
const getUserNotifications = async (id) => {
  try {
    const payload = await Notification.find({
      user:
      {
        $in: new ObjectId(id)
      }
    })
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// delete all user notifications when checked, there is probably some refactoring that can be done here. -Pat
const deleteNotifications = async (idObj) => {
  let result = idObj.map(idArray => idArray._id)
  try {
    const payload = await Notification.deleteMany({
      _id:
      {
        $in: result.map((id) => {
          return new ObjectId(id)
        })
      }
    })
    return payload
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// Creates new notification when likes and comments are performed
const createNotification = async (body) => {
  try {
    const notification = await Notification.create(body);
    return notification
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = {
  getNotifications,
  createNotification,
  getUserNotifications,
  deleteNotifications
};
