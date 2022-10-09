var express = require('express');
var app = express()
var router = express.Router();


var main = require('./main/main')
var signup = require('./signup/signup')
var signin = require('./signin/signin')


router.use('/main',main)
router.use('/signup',signup)
router.use('/signin',signin)




module.exports = router
