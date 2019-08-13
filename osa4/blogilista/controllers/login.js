const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username.toLowerCase() })
  const passwordMatches = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash)

  if (!(user && passwordMatches)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const tokenContent = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokenContent, process.env.SECRET)
  return res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
