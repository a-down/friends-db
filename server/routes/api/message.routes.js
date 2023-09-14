const router = require('express').Router();
const {
  sendMessage,
} = require('../../controllers/message.controller');
const { find } = require('../../controllers/user.controller');

/**
 * Search friends
 * http://localhost:6500/api/friend/find?=req.query
 * req.query = { username: userID }
 */
router.get("/find", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Add friend
 * http://localhost:6500/api/message/message
 * req.body { from: _id, to: _id, message: message  }
 */
router.post("/message", async (req, res) => {
  try {
    const payload = await sendMessage(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Populate friend requests
 * http://localhost:6500/api/friend/id
 * req.params { id: _id }
 */
router.get('/:id', async (req, res) => {
  try {
    const payload = await pendingFriend(req.params.id)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Confirm friend
 * http://localhost:6500/api/friend/
 * req.body = {id: toUser, fromUser: fromUser, confirm:BOOLEAN}
 */
router.put("/", async (req, res) => {
  try {
    const payload = await confirmFriend(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Delete Friend
 * http://localhost:6500/api/friend/id/friendId
 * req.params = {id: _id, friendId: _id}
 */
router.delete("/:id/:friendId", async (req, res) => {
  try {
    const payload = await deleteFriend(req.params)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})


module.exports = router;