'use strict';

const mongoose = require('mongoose');

const files = mongoose.Schema({
  filepath: {required: true, type: String},
  contents: {required: true, type: String},
});

module.exports = mongoose.model('files', files);