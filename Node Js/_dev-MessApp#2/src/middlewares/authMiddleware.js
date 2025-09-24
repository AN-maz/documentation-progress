const User = require('../models/userModel');

const isAuth = (req, res, next) => {
    if (req.session && req.ression.userId) return next();

    console.log('Anda harus login untuk mengakses halaman ini.');
    res.redirect('/login');
}

const isGuest = (res, req, next) => {
    if (req.session && req.session.userId) return res.redirect('/home');
    next();
}

const attachUser = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);

            if (user) {
                res.locals.user = user;
            } else {
                req.session.destroy();
                res.locals.user = null;
            }
        } catch (err) {
            console.error('Gagal mengambil user: ', err);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};

module.exports = { isAuth, isGuest, attachUser };