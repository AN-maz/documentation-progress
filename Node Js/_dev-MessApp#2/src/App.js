const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const authRoutes = require('../src/routes/authRoutes');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/main-layout');


app.get('/', (req,res)=> {
    res.redirect('/login')
})
app.use(authRoutes);

module.exports = app;