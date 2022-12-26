const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  email: String,
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NotebookEntry'
    }
  ],
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Watchlist'
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.passwordHash
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)
module.exports =  User