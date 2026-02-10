const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Koneksi Mysql gagal: " + err.stack);
    return;
  }
  console.log("Terhubung ke MYSQL XAMPP dengan ID: " + db.threadId);
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hallo dari backend Express!",
    status: "Server & Database Aktif",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost${PORT}`);
});
