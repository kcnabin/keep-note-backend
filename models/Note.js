const mongoose = require('mongoose')
const User = require('./User')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  content: String,
  dateCreated: Date,
  pinned: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)