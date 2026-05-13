const app = require('./app'); // Mengambil konfigurasi dari app.js
const pool = require('./config/db'); // Memastikan koneksi database

const PORT = process.env.PORT || 3000;

// Cek koneksi DB sebelum menyalakan server birokrasi
pool.getConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`================================================`);
            console.log(`Server Satir MBG Aktif di port: ${PORT}`);
            console.log(`Status: Siap memproses laporan ABS (Asal Bapak Senang)`);
            console.log(`================================================`);
        });
    })
    .catch(err => {
        console.error('Gagal masuk ke database anggaran:', err);
    });