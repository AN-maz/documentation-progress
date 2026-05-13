const pelicinToken = (req, res, next) => {
    const token = req.headers['x-pelicin-token'];

    if (!token || token !== 'uang-rokok-pusat') {
        return res.status(401).json({
            code: 401,
            status: "Unauthorized",
            message: "Akses diblokir. Token pelicin tidak valid atau kurang nominalnya."
        });
    }
    next();
};

module.exports = { pelicinToken };