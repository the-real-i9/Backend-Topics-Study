const { Sequelize } = require("sequelize");

const dbClient = new Sequelize("learn-psql", "postgres", "fhunmytor", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

module.exports = dbClient;
