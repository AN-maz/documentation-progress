const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });

});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });

});

module.exports = app;