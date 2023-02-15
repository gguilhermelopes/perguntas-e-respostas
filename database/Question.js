const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define("question", {
  questionTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Question.sync({ force: false }).then(() => {});

module.exports = Question;
