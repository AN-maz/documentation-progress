// config/database.js
// Konfigurasi koneksi ke database MySQL

const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'damkar_db'
})

// Coba koneksi saat aplikasi pertama kali dijalankan
db.connect((err) => {
  if (err) {
    console.error('❌ Gagal koneksi ke database:', err.message)
    process.exit(1)
  }
  console.log('✅ Berhasil terhubung ke database MySQL')
})

module.exports = db
