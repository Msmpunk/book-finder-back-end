// const express = require('express');

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

const port = process.env.PORT || 4000;
const production = process.env.NODE_ENV === 'production';

const api_routes = require('./api/routes/routes');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if(production){
  mongoose.connect('mongodb://localhost/book-finder', { useNewUrlParser: true });
}

if(!production) {
  mongoose.connect('mongodb://localhost/book-finder-dev', { useNewUrlParser: true });
  mongoose.set('debug', true);
}

const BookModel = require('./api/models/books.js');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
  secret: 'conduit',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));

app.use('/api/v1',api_routes);

app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

const server = app.listen( port, () => {
  console.log('Listening on port ' + server.address().port);
});
