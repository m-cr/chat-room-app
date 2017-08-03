'use strict'
const Sequelize = require('sequelize')

module.exports = new Sequelize('postgres://localhost/chatroom', {
  logging: console.log
})