const Notification = require('../models/Notification'); // Import your Notification model

const getNotifications = async (req, res) => {
  try {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({message: err});
  }
}

const createNotification = async (body) => {
  try {
    const notification = await Notification.create(body);
    return notification
  } catch (err) {
    throw new Error(err)
  }
}

const markAsRead = async (req, res) => {
  try {
    const {id} = req.params;
    await Notification.findByIdAndUpdate(id, {read: true});
    res.json({message: "Notification marked as read"});
  } catch (err) {
    res.status(500).json({message: err});
  }
}
   

// Export the controller functions
module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  // Add more controller functions as needed
};