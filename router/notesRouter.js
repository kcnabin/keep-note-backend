const notesRouter = require('express').Router()
const mongoose = require('mongoose')
const Note = require('../models/Note')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  try {
    const allNotes = await Note.find({})
    response.json(allNotes)

  } catch (error) {
    console.log('Error fetching initial data from mongoDB')
  }

})

notesRouter.delete('/:id', async (request, response) => {
  const deleteId = request.params.id

  try {
    await Note.findOneAndRemove({_id: deleteId})
    console.log('Deleted successfully')
    response.end()

  } catch (error) {
    console.log(error)
    console.log('Error deleting!')
    response.status(404).end()
  }

})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKENID)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or expired'
    })
  }

  const { title, content, pinned } = request.body

  const user = await User.findById(decodedToken.id)

  const newNote = {
    title: title,
    content: content,
    dateCreated: new Date(),
    pinned: pinned === true ? true : false,
    user: user._id
  }

  const note = new Note(newNote)

  try {
    const returnedNote = await note.save()
    user.notes = user.notes.concat(returnedNote._id)
    await user.save()

    console.log('New Note created!')
    response.status(201).json(returnedNote)

  } catch (error) {
    console.log(error)
    console.log('Error saving to Mongo')
    response.status(400).json({
      error: 'error saving to mongo'
    })
  }
})

module.exports = notesRouter