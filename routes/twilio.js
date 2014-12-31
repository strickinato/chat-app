var express = require('express');
var models = require('../models')
var twilio = require('twilio');
var socket = require('socket.io-client');
var router  = express.Router();
var AARON = '+14152720970'

router.post('/', function(req, res) {
  if(req.param('From') == AARON) {
    var newMessage = models.Message.build({
      body: req.param('Body'),
      aaron: true
    })
    newMessage.save().then(function(){
      socket.emit('message', newMessage.body);
    })
  }

});


module.exports = router;
