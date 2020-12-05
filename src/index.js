const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
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
  const id = req.params.id - 1;

  if (id > 0 && id < studentArray.length) {
    res.send(studentArray[id]);
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

    res.send({ id: id });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
