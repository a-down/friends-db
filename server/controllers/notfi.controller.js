
const Notification = require('../models/Notification'); // Import your Notification model
const getNotifications = async (req, res) => {
  try {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({message: err});
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
  markAsRead,
  // Add more controller functions as needed
};
