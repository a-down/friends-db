const router = require('express').Router();
const {
  sendMessage,
} = require('../../controllers/message.controller');
const { find } = require('../../controllers/user.controller');

/**
 * Search friends
 * use a useEffect for on change keypresses to perfrom this get req
 * using the state of the form being typed into as search params
 * 
 * req.query = { username: userID }
 * http://localhost:6500/api/friend/find?=req.query
 * this may need to be adjusted to search usernames
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
 * the proper method might be post for this one since we create and update docs
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