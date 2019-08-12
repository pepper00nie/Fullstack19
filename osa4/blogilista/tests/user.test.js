const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const testUser = new User(helper.testUser)
  await testUser.save()
})

describe('creating users', () => {
  test('valid user is created properly', async () => {
    const user = {
      name: "Pekka",
      username: "pekkapouta123",
      password: "matalapaine",
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const response = await helper.usersInDb()
  expect(response.length).toBe(2)
  expect(response.map(n => n.name)).toContain('Pekka')
  })

  test('user without username is not created', async () => {
    const user = {
      name: 'Mikko',
      password: 'kanankoipi23',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  
    const response = await helper.usersInDb()
    expect(response.length).toBe(1)
  })

  test('user with a short password is not created', async () => {
    const user = {
      name: 'Juha',
      username: 'juha88',
      password: 'ab',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const response = await helper.usersInDb()
    expect(response.length).toBe(1)
  })

  test('user with existing username is not created', async () => {
    const user = {
      name: 'Toinen Jorma',
      username: 'jormA123',
      password: 'kakka',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(409)

    const response = await helper.usersInDb()
    expect(response.length).toBe(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
