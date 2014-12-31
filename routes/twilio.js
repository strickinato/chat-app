var models = require('../models');
var express = require('express')
var AARON = '+14152720970';

module.exports = function(io) {
  var routes = {};

  routes.post = function(req, res) {
    if(req.param('From') == AARON) {
      var newMessage = models.Message.build({
        body: req.param('Body'),
        aaron: true
      })
      newMessage.save().then(function(error){
        io.emit('message', newMessage);
      })
    }
  }
  return routes;
}
