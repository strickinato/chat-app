var createChat = function() {
  var chatServer = require('socket.io')(server);

  chatServer.on('connection', function(socket) {
    socket.on('message', function(data) {
      chatServer.emit('message', {message: data});
    });
  });
}
