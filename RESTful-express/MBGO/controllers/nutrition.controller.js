const nutritionService = require('../services/nutrition.service.js');

const saveMenu = async (req, res) => {
    try {
        await nutritionService.createMenu(req.body);
        res.status(201).json({
            code: 201,
            status: "Success",
            message: "Menu berhasil dilaporkan. Gizi buruk berhasil disembunyikan dari sistem."
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "Internal Server Error",
            message: "Gagal memanipulasi data gizi."
        });
    }
};

module.exports = { saveMenu };