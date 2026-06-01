// middleware/errorHandler.js
// Middleware untuk menangani error secara terpusat

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message)

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server'
  })
}

module.exports = errorHandler
