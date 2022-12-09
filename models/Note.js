const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  dateCreated: Date,
  pinned: Boolean
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note