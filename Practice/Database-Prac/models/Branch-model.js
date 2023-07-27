const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");

const Branch = dbClient.define(
  "Branch",
  {
    branchNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Branch;
