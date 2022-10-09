var express = require('express')
var app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
var router = express.Router()

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'testdb'
})

connection.connect()


app.use(bodyParser.json())

app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(express.urlencoded({extended:false}));


router.get('/',(req,res) => {
    res.send('Hello , signup');
})

router.post('/',function(req,res){

    
    const param = [req.params.email,req.params.passwd,req.params.name,req.params.phone]


    // const email = req.body.email
    // const passwd = req.body.passwd
    // const name = rqe.body.name
    // const phone = req.body.phone

    connection.query("insert into users (email,passwd,name,phone) values (?,?,?,?);",param,function(err,rows){
        if(err) {
            console.log(err);
            return res.status(400).json({'message':'signup failed'});
        } 
        else{ 
                        return res.status(200).json({'result':'signup success emai : ' +  req.params.email  + 'passwd : ' + req.params.passwd + 'name : ' +req.params.name  + 'phone : ' + req.params.phone })
        }
        })
})


module.exports = router