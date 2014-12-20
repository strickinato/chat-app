module.exports = {};

var guestNumber = 1;
var nicknames = {test: "hi"};

var createChat = function(server) {
  var chatServer = require('socket.io')(server);

  chatServer.on('connection', function(socket) {
    socket.on('message', function(data) {
      chatServer.emit('message', {message: data});
    });

    socket.on('nicknameChangeRequest', function(name) {
      var validName = true;
      for(var key in nicknames) {
        if(nicknames[key] === name)
          validName = false;
      }

      if (validName) {
        nicknames[socket.id] = name;
      }


      socket.emit('nicknameChangeResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    })
  });
}

module.exports.createChat = createChat;
