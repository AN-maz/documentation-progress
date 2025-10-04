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