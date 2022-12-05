// nodejs backend for keep-note app
require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT

let noteObject = {
  title: "Project Note",
  content: "I am building MERN Project from scratch!"
}

app.get('/', async (request, response) => {
  response.json(noteObject)
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

