const notebookRouter = require('express').Router()
const NotebookEntry = require('../models/notebookEntry')
const User = require('../models/user')

notebookRouter.get('/', async (request, response, next) => {
  try {
    const user = await User.findById(request.token.id).populate('entries')
    response.json(user.entries)
  } catch(err) {
    next(err)
  }
})

notebookRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.token.id)
    const notebookEntry = await NotebookEntry.findById(request.params.id)
  
    if (!user._id.equals(notebookEntry.user)) {
      return response.status(401).send({ error: 'An entry can only be seen by its creator'})
    }
    response.json(notebookEntry)
  } catch(err) {
    next(err)
  }
})

notebookRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const user = await User.findById(request.token.id)
  
    const entry = new NotebookEntry({
      date: body.date,
      content: body.content,
      rating: body.rating,
      feeling: body.feeling,
      user: user._id,
      movieTitle: body.movieTitle,
      movieId: body.movieId,
      posterPath: body.posterPath
    })
  
  
    const savedEntry = await entry.save()
    user.entries = user.entries.concat(savedEntry._id)
    await user.save()
    response.status(201).json(savedEntry)
  } catch(err) {
    next(err)
  }

})

notebookRouter.put('/:id', async (request, response) => {
  const { content, feeling, rating }= request.body
  const user = await User.findById(request.token.id)
  const entryToChange = await NotebookEntry.findById(request.params.id)

  if (!user._id.equals(entryToChange.user)) {
    return response.status(401).send({ error: 'An entry can only be changed by its creator'})
  }

  entryToChange.content = content
  entryToChange.feeling = feeling
  entryToChange.rating = rating
  const changedEntry = await entryToChange.save()
  response.json(changedEntry)
})


notebookRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const user = await User.findById(request.token.id)
    const entryToDelete = await NotebookEntry.findById(id)
  
    if (!user._id.equals(entryToDelete.user)) {
      return response.status(401).send({ error: 'An entry can only be deleted by its creator'})
    }
  
    await NotebookEntry.findByIdAndDelete(id)
    response.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = notebookRouter


