var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var router = express.Router();



const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "s2longapp",
  multipleStatements: true,
});

connection.connect();

router.get("/", (req, res) => {
  res.send("Hello , trytest");
});



router.use(express.json());
router.use(express.urlencoded({ extended: false }));
// email 에 맞는 문제를 넣어줘야함
router.post("/",function (req,res){

  const tryclass = req.body.tryclass;

  const query = "select tryclass,word,mean from trytest where tryclass = ?";

  connection.query(query,[tryclass],function(err,rows){
    result = [];
    if(err){
        console.log(err);
        return res.status(400).json({message : "trytest failed"});
    } else{
        for(var i = 0 ; i <4 ; i++){
          let n = Math.floor(Math.random() * 9)
          if (! sameNum(n)) {
            result.push({"word":rows[n].word,"mean":rows[n].mean});  
          }else{
            i--;
          }
        }
        function sameNum (n) {
          return result.find((e) => (e === n));
        }

        // 단어 데이터 개수 단어장 이름 밑으로 반환
        console.log(rows.length);
        console.log(result);


        return res.status(200).json({message:"trytest success"})
    }
   
  })
})



// email 에 맞는 문제를 넣어줘야함
router.get("/getwordlist/:tryclass",function (req,res){

  const tryclass = req.params.tryclass;

  const query = "select * from trytest where tryclass = ?";

  connection.query(query,[tryclass],function(err,rows){
    data = [];
    if(err){
        console.log(err);
        // return res.status(400).json({message : "trytest failed"});
    } else{
        for(var i = 0 ; i <4 ; i++){
          let n = Math.floor(Math.random() * rows.length + 1 )
          if (! sameNum(n)) {
            data.push({"word":rows[n].word,"mean":rows[n].mean});
            // data.push({"word":rows[n].word});  
          }else{
            i--;
          }
        }
        function sameNum (n) {
          return data.find((e) => (e === n));
        }

        // console.log(data);
        const json = JSON.stringify(data);
        jsonDatas = JSON.parse(json);
        let result = jsonDatas;
        // console.log(result);
        return res.json(result);
       }
   
  })
})

 
router.get("/getfirstword/:tryclass",function (req,res){

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
        let n = Math.floor(Math.random() * rows.length  )
        
        data.word = rows[n].word;
        data.mean = rows[n].mean;
        const json = JSON.stringify(data);
        jsonDatas = JSON.parse(json);
        let result = jsonDatas;
        // console.log(result);
        return res.json(result);
       }
   
  })
})


// 단어장 시험 api
router.get("/getwordbookword/:email",function (req,res){

  const email = req.params.email;

  const query = "select * from wordbook where email = ?";

  connection.query(query,[email],function(err,rows){
    data = {
      "word" : "",
      "mean" : "",
    };
    if(err){
        console.log(err);
        // return res.status(400).json({message : "trytest failed"});
    } else{
        let n = Math.floor(Math.random() * rows.length)
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






// sql ? 로 바꾸고  주석 플기
router.get("/numbegginer/:tryclass",(req,res) => {
  const tryclass = req.params.tryclass;
  const query = "select * from trytest where tryclass = ? ";
  connection.query(query,[tryclass] ,function(error,rows){
    // console.log(tryclass);
    // console.log(rows);
    if(error) console.log(error);
    let data = rows.length;
    jsonDatas = JSON.parse(data);
    // console.log(jsonDatas);
    let result = jsonDatas;
    return res.json(result);
  })
});




// router.get("/getresult/:word",(req,res) => {
//   const email = req.params.email;
//   const word = req.params.word;
//   const query = "select * from trytest where word = ? ";
//   connection.query(query,[email,word] ,function(error,rows){
//     let data = { 
//       "word" : "", 
//       "mean" : ""
//     }
//     data.word = rows[0].word;
//     data.mean = rows[0].mean;
//     const json = JSON.stringify(data);
//     jsonDatas = JSON.parse(json);
//     let result = jsonDatas;
//     console.log(result);
//     return res.json(result);
//   })
// });





module.exports = router;

