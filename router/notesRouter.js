const notesRouter = require('express').Router()
const mongoose = require('mongoose')
const Note = require('../models/Note')

notesRouter.get('/', (request, response) => {
  Note
    .find({})
    .then(allNotes => {
      response.json(allNotes)
    })
    .catch(error => {
      console.log('Error fetching initial data from mongoDB')
    })
})

notesRouter.delete('/:id', (request, response) => {
  const deleteId = request.params.id

  Note
    .findOneAndRemove({_id: deleteId})
    .then(() => {
      console.log('Deleted successfully')
      response.end()
    })
    .catch(error => {
      console.log(error)
      console.log('Error deleting!')
      response.status(404).end()
    })

})

notesRouter.post('/', (request, response) => {
  const { title, content, pinned } = request.body

  const newNote = {
    title: title,
    content: content,
    dateCreated: new Date(),
    pinned: pinned ? pinned : false
  }

  const note = new Note(newNote)
  note
    .save()
    .then(returnedNote => {
      response.status(201).json(returnedNote)
    })
    .catch(error => {
      console.log(error)
      console.log('Error saving to Mongo')
      response.status(400).json({
        'error': 'error saving to mongo'
      })
    })

  
})

module.exports = notesRouter