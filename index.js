// nodejs backend for keep-note app
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const notesRouter = require('./router/notesRouter')

const PORT = process.env.PORT

app.use(cors())
app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

