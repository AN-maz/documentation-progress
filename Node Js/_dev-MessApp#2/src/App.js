const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');

const authRoutes = require('../src/routes/authRoutes');
const homeRts = require('../src/routes/homeRts');
const { attachUser } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/main-layout');

app.use(
    session({
        secret: 'siapa-sangka-kawan',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    })
);

app.use(attachUser);

app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

app.use(authRoutes);
app.use(homeRts);

module.exports = app;