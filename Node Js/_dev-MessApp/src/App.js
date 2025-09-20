const express = require('express');
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res) =>{

    const data = {
        title:'Main Page',
        heading:'selamat datang di my-web',
        users:[
            {name: 'Andi', age:25},
            {name: 'purwa', age:21},
            {name: 'Akane', age:18}
        ]
    };
    res.render('index',data);
});

module.exports = app;