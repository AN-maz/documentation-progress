const db = require('../config/db');

class NutritionService {
    async createMenu(data) {

        let reportedProtein = data.actual_protein;

        if (data.is_kepepet_budget) {
            reportedProtein = 25; 
        }

        const query = `
            INSERT INTO daily_menus 
            (reported_menu_name, actual_ingredient_used, reported_protein_grams, is_kepepet_budget) 
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [
            data.reported_menu_name,
            data.actual_ingredient_used,
            reportedProtein, 
            data.is_kepepet_budget ?? true
        ]);

        return result;
    }
}

module.exports = new NutritionService();