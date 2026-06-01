// index.js — Entry point aplikasi
// 🚒 API Sistem Informasi Dinas Pemadam Kebakaran Kota Bandung

require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const posRoutes = require("./routes/pos.routes");
const laporanRoutes = require("./routes/laporan.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(express.json()); // Parsing body JSON

// ── Routes ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚒 API Dinas Pemadam Kebakaran Kota Bandung",
    version: "1.0.0",
    endpoints: {
      pos_pemadam: {
        "GET    /api/pos": "Daftar semua pos pemadam",
        "GET    /api/pos/:id": "Detail pos berdasarkan ID",
        "POST   /api/pos": "Tambah pos baru",
        "PUT    /api/pos/:id": "Update data pos",
        "DELETE /api/pos/:id": "Hapus pos",
      },
      laporan_kebakaran: {
        "GET    /api/laporan": "Daftar semua laporan (dengan info pos)",
        "GET    /api/laporan/:id": "Detail laporan",
        "GET    /api/laporan/status/:status":
          "Filter laporan by status (proses/selesai/batal)",
        "POST   /api/laporan": "Buat laporan baru",
        "PUT    /api/laporan/:id": "Update status laporan",
        "DELETE /api/laporan/:id": "Hapus laporan",
      },
    },
  });
});

app.use("/api/pos", posRoutes);
app.use("/api/laporan", laporanRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Error handler
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚒 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Dokumentasi API: http://localhost:${PORT}/`);
});
