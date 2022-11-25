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
      // console.log('result : ' + rows[0].begginer_re + " " + rows[0].middler_re+" " + rows[0].higher_re+" " + rows[0].toiecer_re );
      // req.session.user = rows[0];
      // console.log("session 생성 완료" + "email : " + req.session.user.email + " name : " + req.session.user.name);
      return res.status(200).json({message:"login success"});
    }
  })
})


// 아이디 찾기
router.get("/getemail/:name/:phone",(req,res) =>{




  const name = req.params.name;
  const phone = req.params.phone;



  const query = "select * from users where name = ? AND phone = ? ";
    let data = {
      "email " : "",
    }
  connection.query(query,[name,phone],function(error,rows){
    console.log(rows[0]);
    data.email = rows[0].email;
    const json = JSON.stringify(data);
    jsonDatas = JSON.parse(json);
    let result = jsonDatas;
    console.log(result);
    return res.json(result);
  });
});

// 비밀번호 찾기
router.get("/getpasswd/:email/:name/",(req,res) =>{

  const email = req.params.email;
  const name = req.params.name;

  const query = "select * from users where email = ? AND  name = ? ";
  connection.query(query,[email,name],function(error,rows){
    let data = {
      "passwd" : "",
    }
    console.log(rows[0]);
    data.passwd = rows[0].passwd;
    const json = JSON.stringify(data);
    jsonDatas = JSON.parse(json);
    let result = jsonDatas;
    console.log(result);
    return res.json(result);
  });
});


// // 회원삭제
// router.post("/deleteusers",(req,res) =>{
//   const passwd = req.params.passwd;
//   const query = "delete from users where email = ?";
//   connection.query(query,[email],function(error,rows){
//     if(error){
//       console.log(error);
//        return res.status(400).json({ message:"delete failed"});
//    }else{   
//        return res.status(200).json({ message : "delete success"});
//    }
//   });
// });


// 비밀번호 변경 
// router.post("/chanepasswd",(req,res) =>{
//   const email = req.params.email;
//   const passwd = req.params.passwd;
//   const newpasswd = req.params.chagepasswd;
//   const renewpasswd = req.params.renewpasswd;

//   const query = "update users set passwd = newpasswd where email = ?";
//   connection.query(query,[email,passwd,chagepasswd],function(error,rows){
//     if(error){
//       console.log(error);
//        return res.status(400).json({ message:"change failed"});
//    }else{   
//        return res.status(200).json({ message : "change success"});
//    }
//   });
// });



module.exports = router;