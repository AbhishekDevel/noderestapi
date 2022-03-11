const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const authroute =  require('./routes/auth')
/*app.use((req,res,next) => {
    res.status(200).json({
        message: 'hello2',
    });
});*/
app.use(bodyParser.json());
app.use('/auth',authroute);
module.exports = app;