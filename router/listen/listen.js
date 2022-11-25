
var express = require('express')
var router = express.Router()
const mysql = require("mysql");
const bodyParser = require("body-parser");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "s2longapp",
    multipleStatements: true,
  });
  
  connection.connect();
  
router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.get('/',(req,res) => {
    res.send('Hello , listen');
})


router.get("/listenwordmean/:tryclass",function (req,res){

  const tryclass = req.params.tryclass;

  const query = "select * from trytest where tryclass = ?";

  connection.query(query,[tryclass],function(err,rows){
    data = {
      "word" : "",
      "mean" : "",
    };
    if(err){
        console.log(err);
        // return res.status(400).json({message : "trytest failed"});
    } else{
        let n = Math.floor(Math.random() * rows.length )
        console.log(n);
        data.word = rows[n].word;
        data.mean = rows[n].mean;
        const json = JSON.stringify(data);
        jsonDatas = JSON.parse(json);
        let result = jsonDatas;
        console.log(result);
        return res.json(result);
       }
   
  })
})




module.exports = router

