var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var router = express.Router();



const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
  multipleStatements: true
});

connection.connect();


router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.get('/',(req,res) => {
    res.send('Hello , test');
})


// testR = (req,res) =>{
//   connection.query("select * from test", function (err,results,fields){
//     if (err) console.log(err);
//     console.log(results);
//     return res.json(results);
//   })
// }


  router.post("/", function (req, res) {
    const param = [req.body.score,req.body.field];
    console.log(req.body);
   
    connection.query("INSERT INTO test (score,field) VALUES (?,?);", param, function (err ,rows) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "create test failed" });
      } else {
        // console.log(testRl)
        return res.status(200).json({ message: "create test success" });
      }
    });
  });



module.exports = router