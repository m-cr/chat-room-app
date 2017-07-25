'use strict';
const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/chatroom', {
  logging: console.log
});