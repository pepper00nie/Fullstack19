const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        author: 1, title: 1, url: 1, likes: 1, id: 1,
      })
    res.json(users.map(n => n.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User
      .findById(req.params.id)
      .populate('blogs', {
        author: 1, title: 1, url: 1, likes: 1, id: 1,
      })
    user ? res.json(user.toJSON()) : res.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  try {
    if (!username || !password || username.length < 3 || password.length < 3) {
      return res
        .status(400)
        .json({ error: 'missing or invalid username or password' })
    }
    if (await User.exists({ username: username.toLowerCase() })) {
      return res
        .status(409)
        .json({ error: 'username already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username: username.toLowerCase(),
      name,
      passwordHash,
    })

    const createdUser = await user.save()

    return res.status(201).json(createdUser)
  } catch (exception) {
    return next(exception)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).end()
    }

    await user.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
