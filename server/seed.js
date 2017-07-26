'use strict';

const db = require('./db').db;
const models = require('./db').models;
const User = models.User;
const Message = models.Message;
const Promise = require('sequelize').Promise;

const seed = () => {

  const user = User.create({
    userName: 'Demo User',
    email: 'demo@demo.com',
    password: 'demo',
    lastLogout: Date.now()
  });

  const message = Message.create({
    content: 'Message Content'
  });

  const message1 = Message.create({
    content: 'Message1 Content'
  });

  const message2 = Message.create({
    content: 'Message2 Content'
  });

  return Promise.all([user, message, message1, message2])
    .spread( (user, message, message1, message2) => {
      return Promise.all([
        user.setMessages(message),
        user.setMessages(message1),
        user.setMessages(message2),
        message.setUser(user),
        message1.setUser(user),
        message2.setUser(user)
      ]);
    });
}

db.sync({
  force: true
})
.then( ()=> {
  return seed();
})
.then( ()=> {
  console.log('seeded users and messages!');
  process.exit(0);
})
.catch((err) => {
  console.error('error while seeding');
  console.error(err);
  process.exit(1);
});