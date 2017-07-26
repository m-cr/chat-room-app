'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

module.exports = app;

//logging middlewear
app.use(require('morgan')('dev'));

//serve up static files
app.use(express.static(path.join(__dirname, '../public')));

//body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//serve up index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//api routes
app.use('/api', require('./routes'));

//error logging endware
app.use( (err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//start up server
app.listen(3000, () => console.log(`listening on port 3000`) );