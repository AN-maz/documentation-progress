const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(expressLayout);
app.set('layout','layouts/main-layout');

app.get('/', (req,res) => {
    res.render('login',{
        title:'Login Page'
    });
});



module.exports = app;