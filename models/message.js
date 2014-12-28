"use strict";

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    body: DataTypes.STRING,
    aaron: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  return Message;
};
