var express = require('express');
var app = express()
var router = express.Router();





var main = require('./main/main')
var signup = require('./signup/signup')
var signin = require('./signin/signin')
var test = require('./test/test')
var trytest = require('./trytest/trytest')
var wordbook = require('./wordbook/wordbook')

router.use('/main',main)
router.use('/signup',signup)
router.use('/signin',signin)
// router.use('/test',test)
router.use('/trytest',trytest)
router.use('/wordbook',wordbook)




module.exports = router
