var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var router = express.Router();



const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
  multipleStatements: true,
});

connection.connect();

router.get("/", (req, res) => {
  res.send("Hello , trytest");
});



router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/",function (req,res){

  const tryscore = req.body.tryscore
  const tryfield = req.body.tryfield

  const query = "select tryscore,tryfield,word from trytest where tryscore = ? AND tryfield = ?";

  connection.query(query,[tryscore,tryfield],function(err,rows){
    result = [];
    if(err){
        console.log(err);
        return res.status(400).json({message : "trytest failed"});
    }else{
        for(var i = 0 ; i < rows.length ; i++){
            result.push({"key":i,"val":rows[i].word});
            
        }
        console.log(result);
        return res.status(200).json({message:"trytest success"})
    }
   
  })
})

module.exports = router;