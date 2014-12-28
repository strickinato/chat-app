// "use strict";
//
// var fs        = require("fs");
// var path      = require("path");
// var Sequelize = require("sequelize");
// var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || "development";
// var config    = require(__dirname + '/../config/config.json')[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
// var db        = {};
//
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== basename);
//   })
//   .forEach(function(file) {
//     var model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(function(modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;
//
// -------------------------------------------

var fs = require('fs');
var path = require('path');

module.exports = function (db, DataTypes) {
  var files = fs.readdirSync(__dirname).map(function (file) {
    return path.join(__dirname, file);
  }).filter(function (file) {
    return file !== __filename;
  });

  var models = {};

  files.forEach(function (file) {
    var model = db.import(file);
    models[model.name] = model;
  });

  Object.keys(models).forEach(function (name) {
    if ('associate' in models[name]) {
      models[name].associate(db);
    }
  });

  return models;
};
//
// ----------------------
// "use strict";
//
// var fs        = require("fs");
// var path      = require("path");
// var Sequelize = require("sequelize");
// var env       = process.env.NODE_ENV || "development";
// var config    = require(__dirname + '/../config/config.json')[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
// var db        = {};
//
// fs
// .readdirSync(__dirname)
// .filter(function(file) {
//   return (file.indexOf(".") !== 0) && (file !== "index.js");
// })
// .forEach(function(file) {
//   var model = sequelize["import"](path.join(__dirname, file));
//   db[model.name] = model;
// });
//
// Object.keys(db).forEach(function(modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;
