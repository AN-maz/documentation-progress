const checkPejabatBanner = (req, res, next) => {
    const { is_banner_pejabat_visible } = req.body;

    if (!is_banner_pejabat_visible) {
        return res.status(403).json({
            code: 403,
            status: "Rejected",
            message: "BAST Ditolak! Foto bukti tidak menunjukkan wajah pejabat daerah. Segera perbaiki posisi spanduk."
        });
    }
    next();
};

module.exports = { checkPejabatBanner };