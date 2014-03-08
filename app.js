var express = require('express');
var q = require('q');
var app = express();
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var ObjectID = require('mongodb').ObjectID;

// Logger
app.use(express.logger({}));
// Body parser
app.use(express.bodyParser({ limit: 1024 * 1024 }));


MongoClient.connect('mongodb://127.0.0.1:27017/timechicken', function (err, db) {
  if (err) { throw err; }

  app.get('/', function(req, res) {
    res.json({'api_status': 'live'});
  });

  app.get('/tests', function (req, res) {
    var a = db.collection('test_insert').find();
    q.ninvoke(a, 'toArray').then(function (items) {
      console.log('Found: ', items);
      res.json(items);
    });
  });

  app.get('/tests/:id', function(req, res) {
    var id = ObjectID(req.params.id);
    var collection = db.collection('test_insert');
    q.ninvoke(collection, 'findOne', id).then(function (object) {
      res.json(object);
    });
  });

  app.post('/tests', function (req, res) {
    var data = req.body;
    var collection = db.collection('test_insert');
    q.ninvoke(collection, 'insert', data).then(function (objects) {
      res.json(objects);
    });
  });

  app.del('/tests/:id', function (req, res) {
    var id = ObjectID(req.params.id);
    q.ninvoke(db.collection('test_insert'), 'remove', {_id: id }).then(function () {
      res.send(204);
    });
  });
});





app.listen(3000);