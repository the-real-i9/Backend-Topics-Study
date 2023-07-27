const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");

const PrivateOwner = dbClient.define(
  "PrivateOwner",
  {
    ownerNo: {
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
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eMail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PrivateOwner;
