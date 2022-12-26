const express = require('express')
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notebookRouter = require('./controllers/notebook')
const watchlistRouter = require('./controllers/watchlist')
const moviesRouter = require('./controllers/movies')

const cors = require('cors')
const config = require('./utils/config')
const { tokenExtractor, errorHandler } = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notebook', tokenExtractor, notebookRouter)
app.use('/api/watchlist', watchlistRouter)
app.use('/api/movies', moviesRouter)

app.use(errorHandler)

module.exports = app