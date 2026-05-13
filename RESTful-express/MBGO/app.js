const express = require('express');
const cors = require('cors');
const app = express();

// Middleware dasar
app.use(cors()); 
app.use(express.json());

// Import Routes MBG
const deliveryRoutes = require('./routes/delivery.routes');
const nutritionRoutes = require('./routes/nutrition.routes');
const budgetRoutes = require('./routes/budget.routes');
const { pelicinToken } = require('./middlewares/auth.middleware');

// Registrasi Jalur API dengan proteksi
app.use('/api/delivery', pelicinToken, deliveryRoutes);
app.use('/api/nutrition', pelicinToken, nutritionRoutes);
app.use('/api/budget', pelicinToken, budgetRoutes);

// Export agar bisa dipakai oleh index.js
module.exports = app;