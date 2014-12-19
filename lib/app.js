var chat_server = require('./chat_server.js');
var http = require("http");
var static = require("node-static")

var file = new static.Server('./public');



var server = http.createServer(function (req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
});

server.listen(3000);
chat_server.createChat(server);
