exports.showHome = async (req, res) => {

    try {

        if (!res.locals.user) return res.redirect('/login');

        res.render('home', {
            title: 'Home',
            user: res.locals.user
        });

        console.log('Masuk ke Home');

    } catch (err) {
        console.error('Error di Dashboard: ', err);
        res.redirect('/login');
    }
}