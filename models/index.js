"use strict";

//if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
  , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_ROSE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_ROSE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    var env       = process.env.NODE_ENV || "development";
    var config    = require(__dirname + '/../config/config.json')[env];
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
//}

  var fs        = require("fs");
  var path      = require("path");
  var basename  = path.basename(module.filename);

  var db = {};


  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function(file) {
      var model = sequelize["import"](path.join(__dirname, file));
      db[model.name] = model;
    });


  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  module.exports = db
