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

app.post("/api/student", function (req, res) {
  noOfStudents++;
  const id = noOfStudents;
  const studentName = req.body.name;
  const currClass = req.body.currentClass;
  const division = req.body.division;

  if (studentName && currClass && division) {
    const obj = {
      id: id,
      name: studentName,
      currentClass: currClass,
      division: division,
    };

    studentArray.push(obj);
    studentArray.forEach((student) => {
      JSON.stringify(student);
    });

    res.send({ id: id });
  } else {
    res.sendStatus(400);
  }
});

app.put("/api/student/:id", function (req, res) {
  const id = Number(req.params.id);
  if (id > 0 && id <= studentArray.length) {
    studentArray.forEach((student) => {
      if (student.id === id) {
        if (req.body.name) {
          student.name = req.body.name;
        }
        if (req.body.currentClass) {
          student.currentClass = req.body.currentClass;
        }
        if (req.body.division) {
          student.division = req.body.division;
        }

        res.send(student);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

app.delete("/api/student/:id", function (req, res) {
  const id = Number(req.params.id);

  if (id > 0 && id <= studentArray.length) {
    studentArray.forEach((student, idx) => {
      if (student.id === id) {
        studentArray.splice(idx, 1);
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
