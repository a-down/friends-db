// notificationModel.js
const { Schema, model  } = require('mongoose');


// const notificationSchema = new mongoose.Schema({
// 	incoming_from: {
// 		type: mongoose.Types.ObjectId,
// 		ref: 'User',
// 	},
// 	outgoing_to: {
// 		type: mongoose.Types.ObjectId,
// 		ref: 'User',
// 	},
// 	post_id: {
// 		type: mongoose.Types.ObjectId,
// 		ref: 'Feeds',
// 	},
// 	activity_type: {
// 		type: String,
// 	},
// 	timestamp: {
// 		type: Date,
// 		default: Date.now,
// 	},
// 	seen: {
// 		type: Boolean,
// 	},
// });

const notificationSchema = new Schema({
	message: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId
	},
	read: {
		type: Boolean
	}
})

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
