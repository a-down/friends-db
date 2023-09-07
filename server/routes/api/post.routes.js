const router = require('express').Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,

} = require('../../controllers/post.controller');

router.get("/", async (req, res) => {
  // the find(req.query) might need to be looked at
  try {
    const payload = await getAllPosts(req)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    console.log(err)
    return res.status(400).json({ status: "error" })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await getPostById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createPost(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.put("/", async (req, res) => {
  // example on how to access the req.query 
  // http://localhost:6500/api/post/?_id=64f9d30f44ef1f770483fa79
  try {
    const payload = await updatePost(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})
/*
Not used atm
router.put("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await updateById(id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await deletePost(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

// need LIKE AND UNLIKE


module.exports = router;