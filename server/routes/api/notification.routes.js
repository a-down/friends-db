
const express = require('express');
const router = express.Router();


const {
  createNotification,
  getUserNotifications,
  deleteNotifications
} = require('../../controllers/notfication.controller')

router.get('/:id', async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.params.id)
    return res.status(200).json({notifications})
} catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
}
})

router.post('/', async (req, res) => {
  try {
    const newNotification = await createNotification(req.body)
    return res.status(200).json({newNotification})
} catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
}
})

router.put('/', async (req, res) => {
  try {
    const payload = await deleteNotifications(req.body)
    return res.status(200).json({payload})
} catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
}
})

// router.get("/notifications", async (req, res) => {
//   const userId = req.header("userId");
//   const user = await User.findById(userId);
//   if (user) {
//     try {
//       const notifs = await Notification.find({"outgoing_to": user._id, "incoming_from": { $ne: user._id }}, null, {sort: { "timestamp" : "descending" , "seen": "descending" }})
//       .populate("incoming_from");
//       let notifdto = [];
//       notifs.forEach(notification => {
//         let status = '';
//         switch (notification.activity_type) {
//           case "like":
//               status = notification.incoming_from.user_handle + ' liked your post.';
//               break;
//             case "comment":
//               status = notification.incoming_from.user_handle + ' replied to your post.';
//               break;
//             case "mention":
//               status = 'You were mentioned in ' + notification.incoming_from.user_handle +'\'s post.';
//               break;
//         };
//         if (status === "error") {
//           console.log('Notification error.');
//         } else {
//           notifdto.push({
//             '_id': notification._id,
//             'post_id': notification.post_id,
//             'status': status,
//             'seen': notification.seen,
//             'timestamp': notification.timestamp
//           })
//         }
//       });
//       res.status(200).send(notifdto);
//     } catch(err) {
//       res.status(500).send({status: "Internal server error"});
//     }
//   } else {
//     res.status(404).send({status: "No such user exists"});
//   };
// });
// router.put("/notifications/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const notification = await Notification.findById(id);
//     if(notification) {
//       notification.seen = true;
//       await notification.save();
//       res.status(200).send({status: "Notification marked as seen"});
//     }
//   } catch(err) {
//     res.status(500).send({status: "Internal server error"});
//   }
// })
// router.post("/notifications", async (req, res) => {
//   const { outgoing_to, incoming_from, post_id, activity_type } = req.body;

//   if(!outgoing_to || !incoming_from || !post_id || !activity_type) {
//     res.status(400).send({status: "Please provide all required fields"});
//   } else {
//     try {
//       const notification = new Notification({
//         outgoing_to,
//         incoming_from,
//         post_id,
//         activity_type
//       });

//       await notification.save();

//       res.status(201).send({status: "Notification created"});
//     } catch(err) {
//       res.status(500).send({status: "Internal server error"});
//     }
//   });

//   router.delete('/:id', async (req, res) => {

//     try {
//       const notificationId = req.params.id;
  
//       // Find the notification by ID and delete it
//       const deletedNotification = await Notification.findByIdAndRemove(notificationId);
//       if (!deletedNotification) {
//         return res.status(404).json({ message: 'Notification not found' });
//       }
  
//       return res.json({ message: 'Notification deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
  
//   });

  module.exports = router;
  
  
