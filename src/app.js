'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

const router = require('./router/router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Server up on port ${port}`) ),
};
