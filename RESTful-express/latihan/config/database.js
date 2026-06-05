const mysql = require('mysql2/promise');
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "inventory_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// db.connect((err) => {
//   if (err) {
//     console.error("Gagal koneksi ke database:", err.message);
//     process.exit(1);
//   }
//   console.log(" Berhasil terhubung ke database MySQL");
// });

module.exports = db;
