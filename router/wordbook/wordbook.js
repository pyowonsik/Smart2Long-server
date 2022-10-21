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
  

router.get('/',(req,res) => {
    res.send('Hello , wordbook');
})

router.use(express.json());
router.use(express.urlencoded({extended : false})); 

// router.get("/getwordbooklist/:email",(req,res) => {
router.get("/getwordbooklist",(req,res) => {
    // const email = req.params.email;
    const query = "select * from wordbook where email = 'abc@abc.com'";
    connection.query(query,function(error,rows){
        
        // var data = new Object();
        let data = [];
        // for(var i = 0 ; i < rows.length ; i++){
            //     console.log("flutter로 보낼 데이터 : "  + rows[i].word + " , " + rows[i].mean);
            // }
        // word,mean을 get으로 보내고 word,mean을 req.body로 받아서 예문을 get을 보냄
        if(error) console.log(error);
        for(var i = 0;i < rows.length;i++){
            data.push({"word":rows[i].word,"mean" :rows[i].mean});
            // console.log(data[i]);
        }
        // console.log(data);        
        const json = JSON.stringify(data);
        // console.log(json);
        jsonDatas = JSON.parse(json);
        // console.log(jsonDatas);
        let result = jsonDatas;
        console.log(result);
        return res.json(result);
    })
})


router.get("/getexample/:word",(req,res) => {
    
    const word = req.params.word;
    const query = "select * from wordbook where word = ?";
    connection.query(query,[word],function(error,rows){

        let data = {
            "word" : "",
            "ex" : "",
        };
        if(error)console.log(error);
        data.word = rows[0].word;
        data.ex = rows[0].ex;
        console.log(data);
        const json = JSON.stringify(data);
        console.log(json);
        jsonDatas = JSON.parse(json);
        console.log(jsonDatas);
        let result = jsonDatas;
        console.log(result);
        return res.json(result);
        
        // data.push({"word" : rows[0].word, "ex" : rows[0].ex});
        
    })
});




router.post("/deleteword",(req,res) =>{
    const email = req.body.email;
    const word = req.body.word;
    const query = "delete from wordbook where email = ? AND word = ? ";
    connection.query(query,[email,word],function(error,rows){
        if(error){
           console.log(error);
            return res.status(400).json({ message:"delete failed"});
        }else{   
            return res.status(200).json({ message : "delete success"});
        }
    })
})



// insert post로 (시험에서 틀린단어 , 체크한단어)



// email값 pk로 db에서 리스트 형태로 get

module.exports = router;

