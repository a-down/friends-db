// notificationModel.js
const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
	message: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId
	},
})

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
