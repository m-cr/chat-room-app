'use strict'

const router = require('express').Router()
const User = require('../../db').models.User

module.exports = router

//get user from session
router.get('/user', (req, res, next) => {
  if(req.session && req.session.user){
    res.send(req.session.user)
  }
  res.send('No logged in user')
})

//login
router.post('/login', (req, res, next) => {
  User.findOne({
    where: { userName: req.body.userName }
  })
    .then( user => {
      if (!user) {
        User.create({
          password: req.body.password,
          userName: req.body.userName,
          lastLogout: Date.now()
        })
          .then( newUser => {
            req.session.user = newUser.sanitize()
            res.send(newUser.sanitize())
          })
      } else if (user.correctPassword(req.body.password)) {
        req.session.user = user.sanitize()
        res.send(user.sanitize())
      } else {
        res.send('Authentication Fialed: Incorrect credentials.')
      }
    })
    .catch(next)
})

//logout, updated lastLogout, destroy session
router.post('/logout', (req, res, next) => {
  User.findById(req.session.user.id)
    .then( loggedOutUser => {
      loggedOutUser.update({ lastLogout: Date.now() })
    })
    .then( () => {
      req.session.destroy()
      res.sendStatus(204)
    })
    .catch(next)
})