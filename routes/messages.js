var models  = require('../models');

module.exports = function(io) {
  var routes = {};

  routes.post = function(req, res) {
    var newMessage = models.Message.build({
      body: req.param('body')
    });
    newMessage.save().then(function() {
      console.log(newMessage)
      io.emit('message', newMessage)
    }.bind(this));
  }

  return routes;
}
