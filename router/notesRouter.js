const notesRouter = require('express').Router()
const Note = require('../models/Note')

// let noteObject = [
//   {
//     title: "I am building MERN Project from scratch!",
//     content: "I am building MERN Project from scratch!",
//     dateCreated: "2022-12-05T01:52:17.996Z",
//     pinned: true
//   }, 
//   {
//     title: "Express makes server development so much easier",
//     content: "Express makes server development so much easier",
//     dateCreated: new Date(),
//     pinned: false
//   },
//   {
//     title: "Building a project from scratch is best way to solidify learned knowledge",
//     content: "Building a project from scratch is best way to solidify learned knowledge",
//     dateCreated: new Date(),
//     pinned: false
//   },
// ]

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
      console.log(returnedNote)
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