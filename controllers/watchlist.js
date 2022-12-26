const watchlistRouter = require('express').Router()
const Watchlist = require('../models/watchlist')
const WatchlistItem = require('../models/watchlistItem')
const User = require('../models/user')
const { tokenExtractor } = require('../utils/middleware')

// get watchlist
watchlistRouter.get('/:id', async (request, response, next) => {
  try {
    const watchlist = await Watchlist.findById(request.params.id).populate('items')
    response.json(watchlist)
  } catch(err) {
    next(err)
  }
})

// create watchlistItem and add it to an user watchlist
watchlistRouter.post('/:id', tokenExtractor, async (request, response, next) => {
  const body = request.body
  try {
    const watchlist = await Watchlist.findById(request.params.id).populate('items')
    const isInWatchlist = watchlist.items.some(item => item.movieId === body.movieId.toString())
    if (isInWatchlist) {
      return response.status(400).send({error: 'that movie is already on watchlist'})
    }

    const year = body.releaseDate.split('-')[0]

    const item = new WatchlistItem({
      movieTitle: body.title,
      year: year,
      movieId: body.movieId,
      posterPath: body.posterPath,
    })

    const returnedItem = await item.save()
    watchlist.items.push(returnedItem._id)
    await watchlist.save()
    response.status(201).json(returnedItem)
  } catch (err) {
    next(err)
  }
})

// delete watchlistItem and remove it from an user watchlist
watchlistRouter.delete('/:id', tokenExtractor, async (request, response, next) => {
  try {
    const user = await User.findById(request.token.id).populate('watchlist')

    const itemToRemove = user.watchlist.items.find(item => item._id.toString() === request.params.id)

    if (itemToRemove) {
      await WatchlistItem.findByIdAndDelete(itemToRemove.toString())
    }
    
    response.status(204).end()
  } catch(err) {
    next(err)
  }

})



module.exports = watchlistRouter