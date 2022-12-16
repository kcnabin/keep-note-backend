const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
  // destructure username and password from request body
  const { username, password } = request.body

  // check if username exist in database
  const user = await User.findOne({ username })

  // if user doesnot exist, set isPasswordCorrect to false
  // if user exists, check if sent-password is correct by
  // comparing it's hash to password hash saved in DB
  const isPasswordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // if user does not exist or password is incorrect
  // send error message
  if (!(user && isPasswordCorrect)) {
    response.status(401).json({
      error: 'wrong username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  // generating token with expiry time
  const token = jwt.sign(
    userForToken,
    process.env.SECRET_TOKENID,
    { expiresIn: 60 * 5}
  )

  // sending back token and username as response
  console.log(`user '${user.username}' logged in`)
  response
    .send({token, username: user.username, id: user._id})

})

module.exports = loginRouter