const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");
const Client = require("./Client-model.js");
const PropertyForRent = require("./PropertyForRent-model.js");

const Viewing = dbClient.define(
  "Viewing",
  {
    viewDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    comment: DataTypes.TEXT,
  },
  {
    schema: "learn",
    timestamps: false,
  }
);

Viewing.Client = Viewing.belongsTo(Client, {
  foreignKey: {
    name: "clientNo",
    allowNull: false,
  },
});
Viewing.PropertyForRent = Viewing.belongsTo(PropertyForRent, {
  foreignKey: {
    name: "propertyNo",
    allowNull: false,
  },
});

module.exports = Viewing;
