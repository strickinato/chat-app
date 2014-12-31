var models = require('../models')
var AARON = '+14152720970'

module.exports = function(app, io) {
  app.post('/', function(req, res) {
    if(req.param('From') == AARON) {
      var newMessage = models.Message.build({
        body: req.param('Body'),
        aaron: true
      })
      newMessage.save().then(function(){
        io.emit('message', newMessage.body)
      })
    }
  })
}
