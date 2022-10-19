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



// router.get("/getbegwords",(req,res) => {
//   const tryclass = req.body.tryclass;
//   const query = "select * from trytest ";
//   connection.query(query,[tryclass], function(error,rows){
//     if(error) console.log(error);
//     for(var i = 0 ; i < rows[0].length ; i++){
//       if(rows[0].tryclass == '초등영어'){
//         rows[0] = rows[0];
//       }  
//     }
//     console.log(rows );
//     // let data = rows[0].length;
//     // jsonDatas = JSON.parse(data);
//     // console.log(jsonDatas);
//     // let result = jsonDatas;
//     // return res.json(result);
//   })
// });





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
    console.log(jsonDatas);
    let result = jsonDatas;
    return res.json(result);
  })
});




module.exports = router;

