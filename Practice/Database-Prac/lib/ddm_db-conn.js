const { Sequelize } = require("sequelize");

const ddmDBClient = new Sequelize("dvdrental", "postgres", "fhunmytor", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

module.exports = ddmDBClient;
