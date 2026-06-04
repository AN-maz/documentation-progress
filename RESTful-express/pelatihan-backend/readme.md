# Struktur folder 

```text
pelatihan-backend/
├── config/
│   └── database.js          # Koneksi MySQL
├── controllers/
│   └── pesertaController.js  # Logic CRUD
├── routes/
│   └── pesertaRoutes.js      # Definisi endpoint
├── middleware/
│   └── errorHandler.js       # Error handling sederhana
├── .env                      # Konfigurasi (DB host, port, dll)
├── .env.example              # Template .env untuk peserta
├── .gitignore
├── package.json
└── index.js                  # Entry point / server utama
```
> Ini pakai arsitektur MVC sederhana (tanpa Model terpisah biar tidak overwhelming untuk pemula). Cukup untuk ngerti separation of concerns.