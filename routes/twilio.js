var express = require('express');
var twilio = require('twilio');
var router  = express.Router();

router.post('/', twilio.webhook(), function(req, res) {
  // Create a TwiML res
  var twiml = new twilio.TwimlResponse();
  twiml.message('Hello from node.js!');

  // Render the TwiML res as XML
  res.type('text/xml');
  res.send(twiml.toString());
});


module.exports = router;
