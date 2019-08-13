const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenGetter)

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

module.exports = app
