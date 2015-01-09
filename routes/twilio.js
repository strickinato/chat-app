var models = require('../models');
var express = require('express')

var accountSid = 'AC774e0e991e2b08806f4c201a76e1c6cf';
var authToken = "a1e06101f9a43acaaa052eacd87d0c46";
var AARON = '+14152720970';
var TWILIONUM = '+14153673212'

var client = require('twilio')(accountSid, authToken);

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

    if(req.param('to') == AARON) {
      var body = req.param('body')
      client.messages.create({
        body: body,
        to: AARON,
        from: TWILIONUM
      }, function(err, message) {
        console.log(err)
      });
    }

    }
  }
  return routes;
}
