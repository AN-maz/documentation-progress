const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

const authRoutes = require('./routes/authRoutes');
const { attachUser } = require('./middlewares/authMiddleware');

const app = express();

// MIDDLEWARE
app.use((req, res, next) => {
    console.log(`Request Masuk: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SETTINGS EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.use(session({
    secret: 'solat yang penting',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 hari umur cookie
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});


app.use(attachUser);

app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

app.use(authRoutes);

module.exports = app;