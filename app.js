const express = require('express')
const notesRouter = require('./router/notesRouter')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = `mongodb+srv://kcnabin:ilovemongodb@cluster0.9wk8l32.mongodb.net/keepNotes?retryWrites=true&w=majority`

mongoose
  .connect(mongoUrl)
  .then(response => {
    console.log('-----Connected to Mongo-----')
  })
  .catch(error => {
    console.log(error)
    console.log(`-----Can't connect to Mongo-----`)
  })


app.use(express.json())
app.use(cors())
app.use((request, response, next) => {
  console.log(`${request.method} request to ${request.path}`)
  next()
})
app.use('/api/notes', notesRouter)

module.exports = app