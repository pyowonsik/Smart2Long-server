var express = require('express')
const router = require('./router/index')
var app = express()

const session = require('express-session')
const fileStore = require('session-file-store')(session);


app.use(
    session({
        secret: 'kong',
        resave: false,
        saveUninitialized: true,
        stroe: new fileStore({ checkPeriod: 1000 * 60 * 10 }),
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
    })
);





app.use('/',router)
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});



app.listen(3000, () => {
   console.log('server start ...');
});
