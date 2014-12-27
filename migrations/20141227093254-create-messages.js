"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      "messages", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        body: {
          type: DataTypes.STRING,
          allowNull: false
        },
        aaron: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("messages");
    done();
  }
};
