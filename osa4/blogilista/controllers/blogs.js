const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { name: 1, username: 1, id: 1 })

    res.json(blogs.map(n => n.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    blog ? res.json(blog.toJSON()) : res.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const owner = await User.findById(decodedToken.id)

    const {
      title,
      author,
      url,
      likes,
    } = req.body

    const blog = new Blog(
      {
        title,
        author,
        url,
        likes: likes || 0,
        user: owner._id,
      },
    )

    if (!blog.title || !blog.url) {
      return res.status(400).end()
    }

    const result = await blog.save()

    owner.blogs = owner.blogs.concat(result._id)
    await owner.save()

    return res.status(201).json(result.toJSON())
  } catch (exception) {
    
    return next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    }

    const response = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    return res.json(response.toJSON())
  } catch (exception) {
    return next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).end()
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const userIsOwner = decodedToken.id.toString() === blog.user.toString()

    if (!userIsOwner) {
      return res.status(401).json({ error: 'unauthorized' })
    }

    await blog.remove()
    return res.status(204).end()
  } catch (exception) {
    return next(exception)
  }
})

module.exports = blogsRouter
