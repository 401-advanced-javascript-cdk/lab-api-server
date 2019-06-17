'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

require('./src/app.js').start(process.env.API_PORT || 8080);