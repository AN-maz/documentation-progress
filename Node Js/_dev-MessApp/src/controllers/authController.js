const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.showRegisterPage = (req, res) => {
    res.render('register', {
        title: 'register',
        layout: 'layouts/main-layout',
        errorMessage: req.flash('error')
    });
};

exports.registerUser = async (req, res) => {
    try {
        const { username, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            console.log('Error: Password tidak cocok');

            req.flash('error', 'Password tidak cocok MasPur!');
            return res.redirect('/register');
        }

        let user = await User.findOne({ username });

        if (user) {
            console.log('Error: username sudah di gunakan MasPur!');

            req.flash('error', 'Username sudah digunakan MasPur!');
            return res.redirect('/register');
        }

        user = new User({ username, password });

        await user.save();

        req.flash('success', 'Registrasi berhasil! Silakan login.');
        res.redirect('/login');
    } catch (err) {
        req.flash('error', 'Terjadi error di server saat register MasPur!');
        return res.redirect('/register');
    }
};

exports.showLoginPage = (req,res) => {
    res.render('login', {
        title: 'login',
        layout: 'layouts/main-layout',
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    });
};

exports.loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            req.flash('error', 'username atau password salah MasPur!');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            req.flash('error', 'username atau password salah MasPur!');
            return res.redirect('/login');
        }

        req.session.userId = user._id;

        // req.session.save((err) => {
        //     if (err) {
        //         return next(err);
        //     }
        // });

        res.redirect('/home');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Terjadi error di server');
        return res.redirect('/login');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            req.flash('error', 'Gagal untuk logOut MasPur');
            return res.redirect('/home')
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}