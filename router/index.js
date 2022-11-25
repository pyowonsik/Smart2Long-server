var express = require('express');
var app = express()
var router = express.Router();





var main = require('./main/main')
var signup = require('./signup/signup')
var signin = require('./signin/signin')
var trytest = require('./trytest/trytest')
var wordbook = require('./wordbook/wordbook')
var listen = require('./listen/listen')

router.use('/main',main)
router.use('/signup',signup)
router.use('/signin',signin)
router.use('/trytest',trytest)
router.use('/wordbook',wordbook)
router.use('/listen',listen)




module.exports = router
