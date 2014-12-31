var models = require('../models');
var express = require('express')
var AARON = '+14152720970';

module.exports = function(io) {
  var routes = {};

  routes.post = function(req, res) {
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
  return routes;
}
