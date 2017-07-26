'use strict';

const router = require('express').Router();
const User = require('../../db').models.User;
const Message = require('../../db').models.Message;

module.exports = router;

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

// router.get('/messages/new', (req, res, next) => {
//   Message.findAll({
//     where: {
//       createdAt: {
//         $gt: req.user.lastLogout,
//       },
//     },
//     include: [
//       { model: User, attributes: ['username', 'avatar'] },
//       { model: Chatroom, attributes: ['name'] },
//     ],
//     order: [
//       ['createdAt', 'ASC'],
//     ],
//   })
//   .then((foundMessages) => {
//     res.send(foundMessages);
//   })
//   .catch(next);
// });

// // GET request to get all messages of a chatroom
// router.get('/:chatroomId/messages', (req, res, next) => {
//   Message.findAll({
//     where: {
//       chatroomId: req.params.chatroomId,
//     },
//     include: [
//       { model: User, attributes: ['username', 'avatar'] },
//       { model: Chatroom, attributes: ['name'] },
//     ],
//     order: [
//       ['createdAt', 'ASC'],
//     ],
//   })
//   .then((foundMessages) => {
//     res.send(foundMessages);
//   })
//   .catch(next);
// });

// // POST request to add a message
// router.post('/:chatroomId/messages', (req, res, next) => {
//   User.findById(req.body.userId)
//   .then((foundUser) => {
//     return Message.create(req.body)
//       .then((createdMessage) => {
//         const createdMessageInJSON = createdMessage.toJSON();
//         createdMessageInJSON.user = foundUser;
//         return createdMessageInJSON;
//       });
//   })
//   .then((completeMessage) => {
//     res.send(completeMessage);
//   })
//   .catch(next);
// });

// module.exports = router;