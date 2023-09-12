const router = require('express').Router();

// Import any controllers needed here
const { register, login, verify } = require('../../controllers/auth.controller');

router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const { token, user } = await register(req)
    return res.cookie("auth-cookie", token).json({ status: "success", payload: user })
  } catch (err) {
    return res.status(400).json({error: err})
  }
  
})

router.post("/login", async(req, res) => {
  try {
    const { token, user } = await login(req)
    return res.cookie("auth-cookie", token).json({ status: "success", payload: user })
  } catch (err) {
    return res.status(400).json({error: err})
  }
})

router.post("/verify", async (req, res) => {
  try {
    const { user } = await verify(req)
    return res.json({ status: "success", payload: user })
  } catch (err) {
    return res.status(400).json({error: err})
  }
  
})

module.exports = router;
