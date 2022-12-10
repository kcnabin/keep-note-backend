const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', (request, response) => {
  User
    .find({})
    .then(allUsers => {
      response.json(allUsers)
    })
    .catch(error => {
      console.log('Error fetching users')
    })
})

usersRouter.post('/', (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10

  bcrypt
    .hash(password, saltRounds)
    .then(returnedHash => {
      const userObject = new User({
        username,
        passwordHash: returnedHash
       })

      userObject
        .save()
        .then(savedUser => {
          console.log(`User '${savedUser.username}' created! `)
          response.json(savedUser)
        })
        .catch(error => {
          response.status(400).json({
            error: "Can't save user"
          })
        })

    })
    .catch(error => {
      console.log('Error hashing password')
      console.log(error)
    })
})

module.exports = usersRouter