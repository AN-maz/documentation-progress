const deliveryService = require('../services/delivery.service');

const confirmDelivery = async (req, res) => {
    try {
        await deliveryService.createDelivery(req.body);

        res.status(201).json({
            code: 200,
            status: "OK",
            message: "Laporan berhasil dimanipulasi, pimpinan akan senang."
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "Error",
            message: "Sistem sedang diaudit, mohon tunggu sebentar."
        });
    }
};

module.exports = { confirmDelivery };