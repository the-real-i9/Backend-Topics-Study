const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");
const PrivateOwner = require("./PrivateOwner-model.js");
const Staff = require("./Staff-model.js");
const Branch = require("./Branch-model.js");

const PropertyForRent = dbClient.define(
  "PropertyForRent",
  {
    propertyNo: {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

PropertyForRent.PrivateOwner = PropertyForRent.belongsTo(PrivateOwner, {
  foreignKey: {
    name: "ownerNo",
    allowNull: false,
  },
});
PropertyForRent.Staff = PropertyForRent.belongsTo(Staff, {
  foreignKey: "staffNo",
});
PropertyForRent.Branch = PropertyForRent.belongsTo(Branch, {
  foreignKey: {
    name: "branchNo",
    allowNull: false,
  },
});

module.exports = PropertyForRent;
