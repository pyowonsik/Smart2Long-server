var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
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


  const query = "select * from users where email = ?";
  connection.query(query,[email],function(err,rows){
    if(rows.length == 0) {
      console.log("login err");
      return res.status(400).json({message : "login failed"});
    }
    else {
      if(passwd != rows[0].passwd) {
        console.log("passwd err");
        return res.status(401).json({message:'pas22swd failed'});
      }
      console.log(rows[0].name + "님 login success");
      console.log("login success");      
      console.log('result : ' + rows[0].begginer_re + " " + rows[0].middler_re+" " + rows[0].higher_re+" " + rows[0].toiecer_re );
      // req.session.user = rows[0];
      // console.log("session 생성 완료" + "email : " + req.session.user.email + " name : " + req.session.user.name);
      return res.status(200).json({message:"login success"});
    }
  })
})



// sql ? 로 바꾸고  주석 플기
router.get("/begginer",(req,res) => {
  // const email = req.body.email;
  const query = "select * from users where email = 'abc@abc.com' ";
  connection.query(query, function(error,rows){
    if(error) console.log(error);
    // console.log(rows[0].begginer_re);
    // console.log(email);
    let data = rows[0].begginer_re;
    jsonDatas = JSON.parse(data);
    console.log(jsonDatas);
    let result = jsonDatas;
    return res.json(result);
  })
});


// router.get("/middler",(req,res) => {
//   const email = req.body.email;
//   const query = "select * from users ";
//   connection.query(query,[email], function(error,rows){
//     if(error) console.log(error);
//     let data = rows[0].middler_re;
//     jsonDatas = JSON.parse(data);
//     console.log(jsonDatas);
//     let result = jsonDatas;
//     return res.json(result);
//   })
// });


// router.get("/higher",(req,res) => {
//   const email = req.body.email;
//   const query = "select * from users ";
//   connection.query(query,[email], function(error,rows){
//     if(error) console.log(error);
//     let data = rows[0].higher_re;
//     jsonDatas = JSON.parse(data);
//     console.log(jsonDatas);
//     let result = jsonDatas;
//     return res.json(result);
//   })
// });


// router.get("/toiecer",(req,res) => {
//   const email = req.body.email;
//   const query = "select * from users ";
//   connection.query(query,[email], function(error,rows){
//     if(error) console.log(error);
//     let data = rows[0].toiecer_re;
//     jsonDatas = JSON.parse(data);
//     console.log(jsonDatas);
//     let result = jsonDatas;
//     return res.json(result);
//   })
// });

module.exports = router;