var expect = require('expect.js');
var request = require('supertest'), express = require('express');

// var app  = require('../app.js');
// var app = express();
var url = 'http://localhost:3000';

//
describe('GET /api', function(){
  it('respond with 200', function(done){
    request(url)
      .get('/api')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.status).to.eql('live');
        done();
      });
  });
});
