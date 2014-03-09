'use strict';

// Models
var TimeSession = require('./models/TimeSession.js');
var Activity = require('./models/Activity.js');

// Libs
var express = require('express');
var fs = require('fs');
var q = require('q');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var ObjectID = require('mongodb').ObjectID;

// Logging dir
var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

// Init and configure
var app = express();
app.configure(function(){
  app.use(express.logger({stream: expressLogFile}));
  app.use(express.bodyParser());
});

MongoClient.connect('mongodb://127.0.0.1:27017/timechicken', function (err, db) {
  if (err) { throw err; }

  app.get('/api', function(req, res) {
    res.json({'status': 'live'});
  });

  // Activities
  app.get('/api/activities', function (req, res) {
    var a = db.collection('activity').find();
    q.ninvoke(a, 'toArray').then(function (items) {
      res.json(items);
    });
  });

  app.get('/api/activities/:id', function(req, res) {
    var id = ObjectID(req.params.id);
    q.ninvoke(db.collection('activity'), 'findOne', id).then(function (object) {
      res.json(object);
    });
  });

  app.post('/api/activities', function (req, res) {
    var data;
    if (Array.isArray(req.body)) {
      data = [];
      req.body.forEach(function (item) {
        data.push(new Activity(item));
      });
    } else {
      data = new Activity(req.body);
    }
    q.ninvoke(db.collection('activity'), 'insert', data).then(function (objects) {
      res.json(objects);
    });
  });

  app.del('/api/activities/:id', function (req, res) {
    var id = ObjectID(req.params.id);
    q.ninvoke(db.collection('activity'), 'remove', {_id: id }).then(function () {
      res.send(204);
    });
  });
});





app.listen(3000);
