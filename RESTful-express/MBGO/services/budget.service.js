const db = require('../config/db');

class BudgetService {
    async processAnggaran(data) {
        const officialBudget = data.official_budget;
        const gaibDeduction = officialBudget * 0.5;
        const actualBudget = officialBudget - gaibDeduction;

        const query = `
            INSERT INTO mbg_budgets 
            (region_name, official_budget_per_portion, gaib_admin_deduction, actual_budget_for_food) 
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [
            data.region_name,
            officialBudget,
            gaibDeduction,
            actualBudget
        ]);

        return {
            id: result.insertId,
            message: "Anggaran berhasil disunat sistem sebelum sampai ke dapur."
        };
    }
}

module.exports = new BudgetService();