const mongoose = require('mongoose')

const watchlistItemSchema = new mongoose.Schema({
  movieTitle: {
    type: String, 
    required: true 
  },
  year: {
    type: Number,
    required: true 
  },
  movieId: {
    type: String,
    required: true
  },
  posterPath: {
    type: String,
    required: true 
  },
  priority: {
    type: Number,
    min: -1,
    max: 1,
    default: 0
  }
})

const WatchlistItem = mongoose.model('WatchlistItem', watchlistItemSchema) 
module.exports = WatchlistItem