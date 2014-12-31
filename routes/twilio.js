var models = require('../models');
var express = require('express')
var router = express.Router();
var AARON = '+14152720970';

module.exports = function(io) {
  twilioRouter = function(req, res) {
    if(req.param('From') == AARON) {
      var newMessage = models.Message.build({
        body: req.param('Body'),
        aaron: true
      })
      newMessage.save().then(function(error){
        io.emit('message', newMessage.body)
        res.send(error.message)
      })
    }
  }
  return twilioRouter;
}
