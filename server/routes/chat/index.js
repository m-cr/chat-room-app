'use strict';

const router = require('express').Router();
const User = require('../../db').models.User;
const Message = require('../../db').models.Message;

module.exports = router;

//fetch all
router.get('/messages', (req, res, next) => {
  Message.findAll({
    include: [
      { model: User, attributes: ['userName'] },
    ],
    order: [
      ['createdAt', 'ASC'],
    ],
  })
  .then( foundMessages => {
    res.send(foundMessages);
  })
  .catch(next);
});

//fetch all new for user
router.get('/messages/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then( foundUser => {
    Message.findAll({
      where: {
        createdAt: {
          $gt: foundUser.lastLogout,
        },
      },
      include: [
        { model: User, attributes: ['userName'] },
      ],
      order: [
        ['createdAt', 'ASC'],
      ],
    })
    .then( foundMessages => {
      res.send(foundMessages);
    });
  })
  .catch(next);
});

//post
router.post('/messages', (req, res, next) => {
  console.log('endpoint hit');
  User.findById(req.body.userId)
  .then( foundUser => {
    return Message.create({ content: req.body.message })
      .then( createdMessage => {
        return createdMessage.setUser(foundUser);
      })
      .then( linkedMessage => {
        res.send(linkedMessage);
      });
  })
  .catch(next);
});
