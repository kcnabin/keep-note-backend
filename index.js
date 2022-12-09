require('dotenv').config()
const app = require('./app')
const http = require('http')

const PORT = process.env.PORT

const server = http.createServer(app)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})