const notesRouter = require('express').Router()

let noteObject = [
  {
    title: "project init",
    content: "I am building MERN Project from scratch!",
    dateCreated: "2022-12-05T01:52:17.996Z"
  }, 
  {
    title: "Express makes server development so much easier",
    content: "I am building MERN Project from scratch!",
    dateCreated: new Date()
  },
]

notesRouter.get('/', async (request, response) => {
  response.json(noteObject)
})

module.exports = notesRouter