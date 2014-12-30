var express = require('express');
var models = require('../models')
var twilio = require('twilio');
var router  = express.Router();
var AARON = '+14152720970'

router.post('/', function(req, res) {
  if(req.param('From') == AARON) {
    models.Message.create({
      body: req.param('Body'),
      aaron: true
    }).then(function(message) {
      message.emit('message', message.body)
      // var twiml = new twilio.TwimlResponse();
      // twiml.message('Hello from node.js!');
      // res.type('text/xml');
      // res.send(twiml.toString());
      res.redirect('/');
    });


  }

});


module.exports = router;
