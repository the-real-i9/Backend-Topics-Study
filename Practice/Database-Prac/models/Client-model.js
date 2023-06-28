const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");

const Client = dbClient.define(
  "Client",
  {
    clientNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxRent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eMail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "learn",
    timestamps: false,
  }
);

module.exports = Client;
