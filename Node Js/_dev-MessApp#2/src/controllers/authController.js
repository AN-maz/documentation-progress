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
            console.log('(user) Username/Password salah MasPur!')
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('(isMatch) Username/Password salah MasPur!')
            return res.redirect('/login');
        }

        res.redirect('/home');
    } catch (err) {
        console.log(err);
        return res.redirect('/login')
    }
}