const express = require('express');
const app = express();
const authroute =  require('./routes/auth');
const postroute = require('./routes/post')
/*app.use((req,res,next) => {
    res.status(200).json({
        message: 'hello2',
    });
});*/
app.use(express.json());
app.use('/auth', authroute);
app.use('/post', postroute)
module.exports = app;