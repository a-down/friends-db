const router = require('express').Router();

const { register, login, verify } = require('../../controllers/auth.controller');

router.get("/", async (req, res) => {
  return res.status(200).json({ status: "success", payload })
})



router.get("/:id", async (req, res) => {
  const payload = req.params.id
  const oneChat = chats.find((s) => s._id === req.params.id)
  return res.status(200).json({ status: "success", oneChat })

})



module.exports = router;