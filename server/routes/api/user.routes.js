const router = require('express').Router();
const { 
  find,
  findById,
  create,
  updateById,
  remove,
  searchUser 
} = require('../../controllers/user.controller');


router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.get('/username/:username', async (req, res) => {
  try {
    const payload = await searchUser({username: req.params.username})
    return res.status(200).json({ status: 'success', payload})
  } catch (err) {
    console.log(err)
    return res.status(400).json({ status: 'error', err })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    console.log(err)
    return res.status(400).json({ status: "error", msg: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateById(req.params.id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg: err.msg })
  }
})


router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await remove(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})


module.exports = router;
