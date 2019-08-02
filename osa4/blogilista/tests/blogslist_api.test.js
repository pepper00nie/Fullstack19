const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const allPromises = helper.initialTestBlogs.map(blog => new Blog(blog).save())
  await Promise.all(allPromises)
})

describe('getting blogs', () => {
  test('correct number of blogs is returned', async () => {
    const response = await helper
      .blogsInDb()

    expect(response.length).toBe(helper.initialTestBlogs.length)
  })

  test('sample blog is returned correctly', async () => {
    const response = await helper.blogsInDb()

    expect(response.map(n => n.title)).toContain('React patterns')
  })
})

describe('adding a blog', () => {
  test('new valid blog is added correctly', async () => {
    const newBlog = new Blog(
      {
        title: 'Taunon blogi',
        author: 'Tauno Testaaja',
        url: 'https://taunonblogi.com',
        likes: 8,
      },
    )

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response.length).toEqual(helper.initialTestBlogs.length + 1)
    expect(response.map(n => n.title)).toContain(newBlog.title)
  })

  test('blog with undefined likes gets assigned 0 likes', async () => {
    const newBlog = new Blog(
      {
        title: 'Taunon blogi',
        author: 'Tauno Testaaja',
        url: 'https://taunonblogi.com',
      },
    )

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body).toHaveProperty('likes', 0)
  })

  test('invalid blog is not added', async () => {
    const newBlog = new Blog(
      {
        author: 'Jarmo',
        likes: 100,
      },
    )

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await helper.blogsInDb()

    expect(response.length).toBe(helper.initialTestBlogs.length)
  })
})

describe('removing blogs', () => {
  test('delete blog', async () => {
    const deletingThis = helper.initialTestBlogs[1]

    await api
      .delete(`/api/blogs/${deletingThis.id}`)
      .expect(204)

    const result = await helper.blogsInDb()

    expect(result).not.toContain(deletingThis)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
