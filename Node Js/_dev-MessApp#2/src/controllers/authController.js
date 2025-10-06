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
        const { username, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            console.log("Error: Password tidak cocok MasPur");
            req.flash('error', 'Password tidak cocok MasPur!');
            return res.redirect('/register');

        }

        let user = await User.findOne({ username });
        if (user) {
            console.log("Username sudah ada MasPur");
            req.flash('error', 'Username suda digunakan MasPur');
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword // Simpan password yang sudah di-hash
        });
        await user.save();

        req.flash('success', 'Akun berhasil dibuat! Silakan login.');

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        // res.status(500).send('Terjadi error di server saat registrasi.');
        req.flash('error', 'Terjadi error di server saat registrasi MasPur!');
        return res.redirect('/register');
    }
}

exports.showRegisterPage = async (req, res) => {

    res.render('register', {
        title: 'Register'
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