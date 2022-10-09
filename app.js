var express = require('express')
const router = require('./router/index')
var app = express()




app.use('/',router)
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
app.listen(3000, () => {
   console.log('server start ...');
});
