var express = require('express');
var twilio = require('twilio');
var router  = express.Router();
var AARON = '+14152720970'

router.post('/', function(req, res) {
  if(req.body.From == AARON) {
    var twiml = new twilio.TwimlResponse();
    twiml.message('Hello from node.js!');

    // Render the TwiML res as XML
    res.type('text/xml');
    res.send(twiml.toString());
  }

});


module.exports = router;
