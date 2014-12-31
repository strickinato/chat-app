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
    }).emit('message', message.body)
  }

});


module.exports = router;
