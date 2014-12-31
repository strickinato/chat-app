var express = require('express');
var debug = require('debug')('nodeApp');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var http = require("http");

var path = require('path');

var chatServer = require('./chat_server.js');

var db = require("../models")


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../public/')));


if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
module.exports = server;

var io = chatServer.createChat(server)
server.listen(app.get('port'));

var indexRouter = require('../routes/chat');
var messageRouter = require('../routes/messages')(io)
var twilioRoutes = require('../routes/twilio')(io)

app.use('/', indexRouter);
app.post('/messages', messageRouter.post);
app.post('/sms', twilioRoutes.post);
