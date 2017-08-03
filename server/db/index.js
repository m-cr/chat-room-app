'use strict'
const db = require('./_db')

const User = require('./models/user.js')
const Message = require('./models/message.js')

module.exports = {
  db,
  models: {
    User,
    Message
  }
}

Message.belongsTo(User)
User.hasMany(Message)
