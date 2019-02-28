
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  published: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

BooksSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

mongoose.model('Books', BooksSchema);
