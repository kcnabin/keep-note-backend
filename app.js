const express = require('express')
const notesRouter = require('./router/notesRouter')
const usersRouter = require('./router/usersRouter')
const loginRouter = require('./router/loginRouter')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URL

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

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

module.exports = app