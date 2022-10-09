var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
});

connection.connect();

router.get("/", (req, res) => {
  res.send("Hello , signup");
});

router.post("/", function (req, res) {
  const param = [req.body.email, req.body.passwd, req.body.name, req.body.phone];
  console.log(req.body);
  // const email = req.body.email
  // const passwd = req.body.passwd
  // const name = rqe.body.name
  // const phone = req.body.phone

  connection.query("INSERT INTO users (email,passwd,name,phone) VALUES (?,?,?,?);", param, function (err, rows) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "signup failed" });
    } else {
      return res.status(200).json({ result: "signup success" });
    }
  });
});

module.exports = router;