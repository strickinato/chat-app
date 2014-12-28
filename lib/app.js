var express = require('express');
var debug = require('debug')('nodeApp');
var errorHandler = require('errorhandler')
var path = require('path');

var chatServer = require('./chat_server.js');
var http = require("http");

var app = express();

var models = require("../models")
var router = require('../routes/chat');


//Setup Models to be accessed by Sockets
//https://github.com/mhuggins/socket.io-sequelize
var io = require('socket.io')();
var sequelize = require('socket.io-sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
io.use(sequelize(config.database, config.username, config.password, config, path.resolve(__dirname, '../models')));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, '../public/')));
app.use('/', router);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//models.sequelize.sync()

var server = app.listen(app.get('port'));
chatServer.createChat(server);
