const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
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
  const blog = new Blog(
    {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes ? req.body.likes : 0,
    },
  )

  if (!blog.title || !blog.url) {
    res.status(400).end()
  }

  try {
    const result = await blog.save()
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
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
