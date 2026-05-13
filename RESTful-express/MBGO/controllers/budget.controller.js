const budgetService = require('../services/budget.service.js');

const allocateBudget = async (req, res) => {
    try {
        const result = await budgetService.processAnggaran(req.body);
        res.status(201).json({
            code: 201,
            status: "Success",
            message: result.message,
            data: {
                official: req.body.official_budget,
                actual_arrived: req.body.official_budget * 0.5 
            }
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "Error",
            message: "Gagal memproses anggaran, aliran dana terhambat audit."
        });
    }
};

module.exports = { allocateBudget };