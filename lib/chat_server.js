module.exports = {};

var createChat = function(server) {
  var chatServer = require('socket.io')(server);

  chatServer.on('connection', function(socket) {
    socket.on('message', function(data) {
      socket.broadcast.emit('message', {message: data});
    });
  });

  return chatServer;
}

module.exports.createChat = createChat;
