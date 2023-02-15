const express = require("express");
const app = express();
const port = 8080;
const connection = require("./database/database");
const Question = require("./database/Question");
const Answers = require("./database/Answers");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((error) => {
    console.log(error);
  });

// importando o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser (decodificador)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("index", { questions });
  });
});

app.get("/question", (req, res) => {
  res.render("question");
});

app.get("/questionPage/:id", (req, res) => {
  const { id } = req.params;
  Question.findOne({
    where: { id: id },
  }).then((question) => {
    if (question) {
      Answers.findAll({
        where: { questionId: question.id },
        order: [["id", "DESC"]],
      }).then((answer) => {
        res.render("questionPage", { question, answer });
      });
    } else {
      res.render("404");
    }
  });
});

app.post("/postquestion", (req, res) => {
  const { questionTitle, question } = req.body;
  if (questionTitle && question) {
    Question.create({
      question,
      questionTitle,
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("question");
  }
});

app.post("/postanswer", (req, res) => {
  const { answerBody, questionId } = req.body;
  if (answerBody && questionId) {
    Answers.create({
      answerBody,
      questionId,
    }).then(() => {
      res.redirect(`questionPage/${questionId}`);
    });
  } else {
    res.redirect(`questionPage/${questionId}`);
  }
});

app.listen(port, () => {
  console.log("App rodando!");
});
