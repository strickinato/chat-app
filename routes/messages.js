var models  = require('../models');

module.exports = function(io) {
  var routes = {};

  routes.post = function(req, res) {
    var newMessage = models.Message.build({
      body: req.param('body')
    });
    newMessage.save().then(function() {
      io.emit('message', newMessage)
      res.redirect('back')
    });
  }

  return routes;
}
