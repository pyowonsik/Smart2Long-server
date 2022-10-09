var express = require('express');
var app = express()
var router = express.Router();



app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(express.urlencoded({extended:false}));

var signup = require('./signup/signup')
var main = require('./main/main')

router.use('/signup',signup)
router.use('/main',main)





module.exports = router
