var net = require("net");

var server = net.createServer();

server.on("connection", function(socket){
  socket.once("data", function(input1) {
    var i1 = parseInt(input1);
    socket.once("data", function(input2) {
      var i2 = parseInt(input2);
      socket.write((i1 + i2).toString(), function(){
        socket.end();
      });
    });
  });
});

server.listen(3000);
