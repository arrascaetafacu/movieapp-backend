const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Watchlist = require('../models/watchlist')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { password, username } = request.body
  if (!password || !username) {
    return response.status(400).send({ error: 'password or username missing' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
  })

  const newUser = await user.save()

  const watchlist = new Watchlist({ user: newUser.id })
  await watchlist.save()
  newUser.watchlist = watchlist
  newUser.save()

  response.status(201).json(newUser)
})

module.exports = usersRouter