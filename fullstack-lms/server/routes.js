'use strict'

const authHandler = require('./handlers/auth')

const authMiddleware = require('./middlewares/auth')
const roleMiddleware = require('./middlewares/role')

const materiHandler = require('./handlers/materi')
const categoryHandler = require('./handlers/category')

const gamificationHandler = require('./handlers/gamification')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  const router = require('express').Router()
  
  router.get('/health', (req, res) => res.json({ success: true, message: 'API is running smooth!' }))
  
  
  router.post('/auth/register', authHandler.register)
  router.post('/auth/login', authHandler.login)
  
  router.get('/categories', categoryHandler.getAll)

  router.get('/materials', materiHandler.getAll)
  router.get('/materials/:slug', materiHandler.getBySlug)


  router.post('/materials/:id/complete', authMiddleware, gamificationHandler.complete)
  router.post('/materials/:id/ratings', authMiddleware, gamificationHandler.rate)
  router.get('/leaderboard', gamificationHandler.getLeaderboard)

  app.use('/api/v1', router)

}

// 'use strict'

// // Import Handlers
// const commentHandler = require('./handlers/comment')
// const adminHandler = require('./handlers/admin')

// // Import Middlewares

// module.exports = function (app, opts) {
//   const router = require('express').Router()

//   // Healthcheck Route
//   router.get('/health', (req, res) => res.json({ success: true, message: 'API is running smooth!' }))

//   // --- Auth Routes ---


//   // --- Categories Routes ---

//   // --- Materials Routes (Public & Learner) ---


//   // --- Comments Routes ---
//   router.get('/materials/:id/comments', commentHandler.getByMaterial)
//   router.post('/materials/:id/comments', authMiddleware, commentHandler.create)

//   // --- Creator Routes ---
//   router.post('/materials', authMiddleware, materiHandler.create)
//   router.get('/users/me/materials', authMiddleware, materiHandler.getUserMaterials)

//   // --- Admin Routes ---
//   router.get('/admin/materials', authMiddleware, roleMiddleware('admin'), adminHandler.getPendingMaterials)
//   router.patch('/admin/materials/:id/status', authMiddleware, roleMiddleware('admin'), adminHandler.updateStatus)

//   // Prefix All Routes with `/api/v1`
//   app.use('/api/v1', router)
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVmM2JmMWYzLWY1ODAtNDZlZi05NTI1LTc5MjhkYjY4NDVhZSIsImVtYWlsIjoicHVyd2FAZ21haWwuY29tIiwicm9sZSI6ImxlYXJuZXIiLCJpYXQiOjE3ODgwNzU1MTcsImV4cCI6MTc4ODA3OTExN30.zdpeXcueftxRxaUN2ls01klJ7aoNJ0mNCFILmsnPsOw