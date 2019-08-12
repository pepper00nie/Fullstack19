const blogsRouter = require('express').Router()
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
  const owner = await User.findOne({})

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
    res.status(400).end()
  }

  try {
    const result = await blog.save()
    owner.blogs = owner.blogs.concat(result._id)
    await owner.save()

    res.status(201).json(result.toJSON())
  } catch (exception) {
    next(exception)
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
    res.json(response.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      res.status(404).end() 
    }

    await blog.remove()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
