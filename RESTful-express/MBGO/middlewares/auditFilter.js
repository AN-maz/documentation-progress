const checkPejabatBanner = (req, res, next) => {
    const { is_banner_pejabat_visible } = req.body;

    if (!is_banner_pejabat_visible) {
        return res.status(403).json({
            code: 403,
            status: "Rejected",
            message: "BAST ditolak! Wajah pejabat tidak terlihat jelas di boks makanan."
        });
    }
    next();
};

module.exports = { checkPejabatBanner };