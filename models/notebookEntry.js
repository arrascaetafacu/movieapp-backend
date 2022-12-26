const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  content: String,
  feeling: String,
  rating: Number,
  movieId: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  posterPath: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const NotebookEntry = mongoose.model('NotebookEntry', entrySchema)
module.exports = NotebookEntry