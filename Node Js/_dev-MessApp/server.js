require('dotenv').config();
const app = require('./src/App');
const connectDB = require('./src/config/db');
const http = require('http');

// const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});