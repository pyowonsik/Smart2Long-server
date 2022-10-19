var express = require('express')
var router = express.Router()


router.get('/',(req,res) => {
    res.send('Hello , wordbook');
})

// insert post로 (시험에서 틀린단어 , 체크한단어)


// email값 pk로 db에서 리스트 형태로 get

module.exports = router