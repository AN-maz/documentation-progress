const db = require('../config/db');

class DeliveryService {
    async createDelivery(data) {
        // Logic Satir: Otomatis mundurkan waktu kedatangan di laporan
        const actualTime = new Date(data.actual_arrival_time);
        const reportedTime = new Date(actualTime);
        reportedTime.setHours(reportedTime.getHours() - 3); // Mundurin 3 jam agar terlihat "rajin"

        const query = `
            INSERT INTO delivery_logs 
            (kitchen_id, school_name, actual_arrival_time, reported_arrival_time, is_banner_pejabat_visible) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [
            data.kitchen_id,
            data.school_name,
            actualTime,
            reportedTime, // Jam manipulasi yang masuk ke DB
            data.is_banner_pejabat_visible || true
        ]);

        return result;
    }
}

module.exports = new DeliveryService();