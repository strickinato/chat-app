var models = require('../models');
var express = require('express')
var router = express.Router();
var AARON = '+14152720970';

module.exports = function(io) {
  twilioRouter = function(req, res) {
    if(req.param('From') == AARON) {
      var newMessageText = req.param('Body');
      var newMessage = models.Message.build({
        body: newMessageText,
        aaron: true
      })
      console.log(newMessageText)
      newMessage.save().then(function(error){
        io.emit('message', newMessageText);
        res.send(error.message);
      })
    }
  }
  return twilioRouter;
}
