var express = require('express');
var debug = require('debug')('nodeApp');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');

var path = require('path');

var chatServer = require('./chat_server.js');
var http = require("http");

var app = express();

var models = require("../models")
var indexRouter = require('../routes/chat');
var messageRouter = require('../routes/messages')

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

models.sequelize.sync()

var server = app.listen(app.get('port'));
chatServer.createChat(server);
