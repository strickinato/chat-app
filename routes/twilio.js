var express = require('express');
var twilio = require('twilio');
var router  = express.Router();
var AARON = '+14152720970'

router.post('/', function(req, res) {
  if(req.param('From') == AARON) {
    models.Message.create({
      body: req.param('body'),
      aaron: true
    }).then(function() {
      var twiml = new twilio.TwimlResponse();
      twiml.message('Hello from node.js!');
      res.type('text/xml');
      res.send(twiml.toString());
      res.redirect('/');
    });


  }

});


module.exports = router;
