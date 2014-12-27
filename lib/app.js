var express = require('express');
var debug = require('debug')('nodeApp');
var errorHandler = require('errorhandler')
var path = require('path');

var chat_server = require('./chat_server.js');
var http = require("http");

var app = express();

var models = require("../models")
var router = require('../routes/chat');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}


models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

//chat_server.createChat(server);
