var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const e = require("express");
var router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
});

connection.connect();

router.get("/", (req, res) => {
  res.send("Hello , signin");
});



router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/",function (req,res){

  const email = req.body.email
  const passwd = req.body.passwd

  const pass = false;
  const query = "select email,passwd from users where email = ?";
  connection.query(query,[email],function(err,rows){


    
  
    if(rows.length == 0) {
      console.log("login err");
      return res.status(400).json({message : "login failed"});
    }
    else {
    
      if(passwd != rows[0].passwd) {
        console.log("passwd err");
        return res.status(401).json({message:'passwd failed'});
      }
      console.log("login success");
      return res.status(200).json({message:"login success"});
    }


  })

})



module.exports = router;