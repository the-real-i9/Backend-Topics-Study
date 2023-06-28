const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");
const Client = require("./Client-model.js");
const Branch = require("./Branch-model.js");
const Staff = require("./Staff-model.js");

const Registration = dbClient.define(
  "Registration",
  {
    dateJoined: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    schema: "learn",
    timestamps: false,
  }
);

Registration.Client = Registration.belongsTo(Client, {
  foreignKey: {
    name: "clientNo",
    allowNull: false,
  },
});
Registration.Branch = Registration.belongsTo(Branch, {
  foreignKey: {
    name: "branchNo",
    allowNull: false,
  },
});
Registration.Staff = Registration.belongsTo(Staff, {
  foreignKey: {
    name: "staffNo",
    allowNull: false,
  },
});

module.exports = Registration;
