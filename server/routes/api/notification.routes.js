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

  module.exports = router;
  
  
