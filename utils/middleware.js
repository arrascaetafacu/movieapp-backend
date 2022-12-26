const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  let token
  const authorization = request.headers.authorization
  if (authorization && authorization.toLowerCase().includes('bearer ')) {
    token =  authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) return response.json(401).json({ error: 'token missing or invalid'})
  request.token = decodedToken
  
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'JsonWebTokenError') {
    response.status(401).send({ error: 'jwt must be provided'})
  }
  if (error.name === 'ValidationError') {
    response.status(400).send({ error: 'A field is missing'})
  }
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Malformatted id'})
  }

  next(error)
}

module.exports = {tokenExtractor, errorHandler}

