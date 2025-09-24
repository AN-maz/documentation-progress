require('dotenv').config();
const app = require('./src/App');
const http = require('http');
const connectDB = require('./src/config/db');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

connectDB();

server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

