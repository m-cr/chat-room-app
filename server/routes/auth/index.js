'use strict';

const router = require('express').Router();
const User = require('../../db').models.User;

module.exports = router;

router.post('/', (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
  .then( user => {
    if (!user) {
      User.create({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        lastLogout: Date.now()
      }).then( newUser => {
        res.send({
          success: true,
          user: newUser.sanitize()
        });
      });
    } else if (user.correctPassword(req.body.password)) {
      res.send({
        success: true,
        user: user.sanitize()
      });
    } else {
      res.send('Authentication Fialed: Incorrect credentials.')
    }
  })
  .catch(next);
});