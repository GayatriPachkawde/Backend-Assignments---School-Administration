const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const fs = require("fs");
const studentArray = require("./InitialData");
app.use(express.urlencoded());

let noOfStudents = studentArray.length;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/student", function (req, res) {
  res.send(studentArray);
});
app.get("/api/student/:id", function (req, res) {
  const id = Number(req.params.id);

  if (id > 0 && id <= studentArray.length) {
    studentArray.forEach((student) => {
      if (student.id === id) {
        res.send(student);
      }
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/student", (req, res) => {
  if (req.body.name && req.body.currentClass && req.body.division) {
    const student = {
      id: studentArray[studentArray.length - 1].id + 1,
      name: req.body.name,
      currentClass: Number(req.body.currentClass),
      division: req.body.division,
    };

    studentArray.push(student);
    res.send({ id: student.id });
  } else {
    res.sendStatus(400);
  }
});

app.put("/api/student/:id", (req, res) => {
  const objInd = studentArray.findIndex(
    (student) => student.id == req.params.id
  );
  // console.log(objInd);
  if (objInd === -1) res.sendStatus(400);
  else {
    let flag = false;
    for (let i = 0; i < Object.keys(req.body).length; i++) {
      if (
        ["name", "currentClass", "division"].includes(Object.keys(req.body)[i])
      ) {
        // console.log(Object.keys(req.body)[i]);
      } else {
        flag = true;
        break;
      }
    }
    if (flag) res.sendStatus(400);
    else {
      studentArray[objInd].name =
        req.body.name !== undefined ? req.body.name : studentArray[objInd].name;
      studentArray[objInd].currentClass =
        req.body.currentClass !== undefined
          ? Number(req.body.currentClass)
          : studentArray[objInd].currentClass;
      studentArray[objInd].division =
        req.body.division !== undefined
          ? req.body.division
          : studentArray[objInd].division;
      res.send(studentArray[objInd]);
    }
  }
});

app.delete("/api/student/:id", (req, res) => {
  const idToSearch = req.params.id;

  const matched = studentArray.findIndex(
    (student) => student.id === Number(idToSearch)
  );

  if (matched === -1) {
    res.sendStatus(404);
  } else {
    studentArray.splice(matched, 1);
    res.sendStatus(200);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
