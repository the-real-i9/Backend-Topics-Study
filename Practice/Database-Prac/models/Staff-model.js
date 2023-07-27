const { DataTypes } = require("sequelize");

const dbClient = require("../lib/db-conn.js");
const Branch = require("./Branch-model.js");

const Staff = dbClient.define(
  "Staff",
  {
    staffNo: {
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
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Staff.Branch = Staff.belongsTo(Branch, {
  foreignKey: {
    name: "branchNo",
    allowNull: false,
  },
});

module.exports = Staff;
