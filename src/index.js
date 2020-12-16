// const mongoose = require("mongoose");

// const marioSchema = new mongoose.Schema({
//   name: String,
//   weight: Number,
// });

// //
// //module.exports = mongoose.model("marioModel", marioModel);
// const marioModel = mongoose.model("mariochar", marioSchema);
// module.exports = marioModel;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const fs = require("fs");
var studentArray = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
app.get("/api/student", (req, res) => {
  res.send(studentArray);
});
app.get("/api/student/:id", (req, res) => {
  let id = Number(req.params.id);
  if (id >= 1 && id <= 7) {
    res.send({
      id: studentArray[id - 1].id,
      name: studentArray[id - 1].name,
      currentClass: studentArray[id - 1].currentClass,
      division: studentArray[id - 1].division,
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/student", (req, res) => {
  const bodyData = req.body;
  const id = studentArray.length + 1;
  const name = req.body.name;
  const currentClass = req.body.currentClass;
  const division = req.body.division;
  if (name && currentClass && division) {
    studentArray.push({
      id: id,
      name: name,
      currentClass: currentClass,
      division: division,
    });
    res.send({ id: id });
  } else {
    res.sendStatus(400);
  }
});

app.put("/api/student/:id", (req, res) => {
  const object = studentArray[req.params.id - 1];
  if (!object) {
    res.sendStatus(400);
  } else {
    if (req.body.name || req.body.currentClass || req.body.division) {
      if (req.body.name) {
        object.name = req.body.name;
      }
      if (req.body.currentClass) {
        object.currentClass = Number(req.body.currentClass);
      }
      if (req.body.division) {
        object.division = req.body.division;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
});

app.delete("/api/student/:id", (req, res) => {
  let id = Number(req.params.id);
  if (id >= 1 && id <= 7) {
    studentArray.splice(id, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
