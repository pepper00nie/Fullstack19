const tokenGetter = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    res.status(401).send({ error: 'missing or invalid token' })
  } else {
    res.status(500).send({ error: err.message })
  }
  next()
}

module.exports = {
  tokenGetter,
  errorHandler,
}
