const Sequelize = require("sequelize");
const connection = require("./database");

const Answers = connection.define("answer", {
  answerBody: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answers.sync({ force: false });

module.exports = Answers;
