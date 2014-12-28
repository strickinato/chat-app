"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Message", {
    body: DataTypes.STRING,
    aaron: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
}
