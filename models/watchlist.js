const mongoose = require('mongoose')

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WatchlistItem'
  }]
})

watchlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema)
module.exports = Watchlist