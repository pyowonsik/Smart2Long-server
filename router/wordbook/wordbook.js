var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { query } = require("express");
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

// // router.get("/getwordbooklist/:email",(req,res) => {
// router.get("/getwordbooklist",(req,res) => {
//     // const email = req.params.email;
//     const query = "select * from wordbook where email = 'abc@abc.com'";
//     connection.query(query,function(error,rows){
        
//         // var data = new Object();
//         let data = [];
//         // for(var i = 0 ; i < rows.length ; i++){
//             //     console.log("flutter로 보낼 데이터 : "  + rows[i].word + " , " + rows[i].mean);
//             // }
//         // word,mean을 get으로 보내고 word,mean을 req.body로 받아서 예문을 get을 보냄
//         if(error) console.log(error);
//         for(var i = 0;i < rows.length;i++){
//             data.push({"word":rows[i].word,"mean" :rows[i].mean});
//             // console.log(data[i]);
//         }
//         // console.log(data);        
//         const json = JSON.stringify(data);
//         // console.log(json);
//         jsonDatas = JSON.parse(json);
//         // console.log(jsonDatas);
//         let result = jsonDatas;
//         console.log(result);
//         return res.json(result);
//     })
// })



router.get("/getwordbooklist/:email",(req,res) => {
        const email = req.params.email;
        const query = "select * from wordbook where email = ?";
        connection.query(query,[email],function(error,rows){

            console.log(email);
            
            let data = [];
            if(error) console.log(error);
            for(var i = 0;i < rows.length;i++){
                data.push({"word":rows[i].word,"mean" :rows[i].mean});
                // console.log(data[i]);
            }
            console.log(data);
            const json = JSON.stringify(data);
            jsonDatas = JSON.parse(json);
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




// Test 페이지에서 (email,word)로 wordinfo 를 가져와서 insertword로 단어장에 넣어줘야함
router.get('/getwordinfo/:email/:word', (req,res) => {

    const email = req.params.email;
    const word = req.params.word;

    const query = "select * from trytest where email = ? AND word = ? ";
    connection.query(query,[email,word],function(error,rows){
        
        
    

        let data = {
            "email" : "",
            "word" : "",
            "mean" : "",
            "ex" : ""           
        }

        console.log(email);
        console.log(word);
        console.log(rows[0]);
        data.email = rows[0].email;
        data.word = rows[0].word;
        data.mean = rows[0].mean;
        data.ex = rows[0].ex;
        const json = JSON.stringify(data);
        console.log(json);
        jsonDatas = JSON.parse(json);
        console.log(jsonDatas);
        let result = jsonDatas;
        console.log(result);
        return res.json(result);
    })

})


router.get("/gettodayword/:email",(req,res) => {
    

    const email = req.params.email;
 
    const query = "select * from wordbook where email = ? ";
    connection.query(query,[email],function(error,rows){
      let data = {
        "word" : "",
        "mean" : "",
      }
  
      const n = Math.floor(Math.random() * (rows.length) + 1)
      data.word = rows[n].word;
      data.mean = rows[n].mean;
      const json = JSON.stringify(data);
      jsonDatas = JSON.parse(json);
      let result = jsonDatas;
      console.log(result);
      return res.json(result);
  
  
      // let data = { 
      //   "word" : "", 
      //   "mean" : ""
      // }
      // data.word = rows[0].word;
      // data.mean = rows[0].mean;
      // const json = JSON.stringify(data);
      // jsonDatas = JSON.parse(json);
      // let result = jsonDatas;
      // console.log(result);
      // return res.json(result);
    })
  });
  



//단어장으로 들어올때는 Test(틀림,체크) 에서만 가능 하기 때문에 Test에서 email,word,mean,ex 모두 쏴줘야한다.
// email에 맞는 단어를 넣어줘야 하기 때문에 안된다 아직
router.post("/insertword" , (req,res) =>{

    const email = req.body.email;
    const word = req.body.word;
    const mean = req.body.mean;
    const ex = req.body.ex;

    console.log(req.body);
    // const word = req.body.word;
    const query = "insert into wordbook (email,word,mean,ex) values (?,?,?,?)";
    connection.query(query,[email,word,mean,ex],function(error,rows){
        if(error){
            console.log(error);
            return res.status(400).json({message : "insert failed"});
        }
        else{
            return res.status(200).json({message : "insert success"});
        }
    })
}) 





// insert post로 (시험에서 틀린단어 , 체크한단어)



module.exports = router;

