// notificationModel.js
const mongoose = require('mongoose');
const toast = require('react-toastify')


const notificationSchema = new mongoose.Schema({
	incoming_from: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	outgoing_to: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	post_id: {
		type: mongoose.Types.ObjectId,
		ref: 'Feeds',
	},
	activity_type: {
		type: String,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	seen: {
		type: Boolean,
	},
});
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
