const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

module.exports = app
