var express = require('express');
var debug = require('debug')('nodeApp');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var http = require("http");

var path = require('path');

var chatServer = require('./chat_server.js');

var db = require("../models")
var indexRouter = require('../routes/chat');
var messageRouter = require('../routes/messages')

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../public/')));

app.use('/', indexRouter);
app.use('/messages', messageRouter);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}


var server = http.createServer(app);
var io = require('socket.io')(server)
server.listen(app.get('port'));



var twilioRouter = require('../routes/twilio')
twilioRouter(app, io)
