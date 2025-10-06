const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.showLoginPage = (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            // console.log('(user) Username/Password salah MasPur!')
            req.flash('error', '(user) Username/Password salah MasPur!');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // console.log('(isMatch) Username/Password salah MasPur!')
            req.flash('error', '(isMatch) Username/Password salah MasPur!');
            return res.redirect('/login');
        }

        // Simpan session
        req.session.userId = user._id;

        req.session.save((err) => {
            if (err) {
                // return next(err);
                console.log(err);
            }
        });

        res.redirect('/home');
    } catch (err) {
        console.log(err);
        req.flash('error', 'terjadi error di server');
        return res.redirect('/login')
    }
}

exports.registerUser = async (req, res) => {

    try {
        const { username, pass, passConf } = req.body;

        if (pass !== passConf) {
            console.log("Error: Password tidak cocok MasPur");
            req.flash('error', 'Password tidak cocok MasPur!');
            return res.redirect('/register');

        }

        let user = await User.findOne({ username });
        if (user) {
            console.log("Username sudah ada MasPur");
            req.flash('error', 'Username suda digunakan MasPur');
            res.redirect('/register');
        }

        user = new User({ username, pass });
        await user.save();

        res.redirect('/login');
    } catch (err) {

    }
}

exports.showRegisterPage = async (req, res) => {

    res.render('register', {
        title: 'Register',
        errorMessage: req.flash('error')
    });
};

exports.logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            req.flash('error', 'Gagal untuk logout MasPur!');
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
}