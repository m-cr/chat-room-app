'use strict';

const db = require('../_db');

module.exports = db.define('message', {
  content: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});