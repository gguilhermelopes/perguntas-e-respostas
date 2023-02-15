const Sequelize = require("sequelize");

const connection = new Sequelize("perguntaserespostas", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
