'use strict'

const db = require('./db').db
const models = require('./db').models
const User = models.User
const Message = models.Message
const Promise = require('sequelize').Promise

const seed = () => {

  const user = User.create({
    userName: 'demo',
    password: 'demo',
    lastLogout: Date.now()
  })

  const user2 = User.create({
    userName: 'demo2',
    password: 'demo2',
    lastLogout: Date.now()
  })

  const message = Message.create({
    content: 'Message Content'
  })

  const message1 = Message.create({
    content: 'Message1 Content'
  })

  const message2 = Message.create({
    content: 'Message2 Content'
  })

  const message3 = Message.create({
    content: 'Message3 Content'
  })

  const message4 = Message.create({
    content: 'Message4 Content'
  })

  const message5 = Message.create({
    content: 'Message5 Content'
  })

  return Promise.all([user, user2, message, message1, message2, message3, message4, message5])
    .spread( (user, user2, message, message1, message2, message3, message4, message5) => {
      return Promise.all([
        user.setMessages(message),
        user.setMessages(message1),
        user.setMessages(message2),
        user2.setMessages(message3),
        user2.setMessages(message4),
        user2.setMessages(message5),
        message.setUser(user),
        message1.setUser(user),
        message2.setUser(user),
        message3.setUser(user2),
        message4.setUser(user2),
        message5.setUser(user2)
      ])
    })
}

db.sync({
  force: true
})
  .then( ()=> {
    return seed()
  })
  .then( ()=> {
    console.log('seeded users and messages!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('error while seeding')
    console.error(err)
    process.exit(1)
  })