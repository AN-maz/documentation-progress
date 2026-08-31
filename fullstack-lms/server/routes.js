'use strict'

const authHandler = require('./handlers/auth')
const categoryHandler = require('./handlers/category')
const materiHandler = require('./handlers/materi')
const gamificationHandler = require('./handlers/gamification')
const commentHandler = require('./handlers/comment')
const adminHandler = require('./handlers/admin')

const authMiddleware = require('./middlewares/auth')
const roleMiddleware = require('./middlewares/role')

module.exports = function (app, opts) {
  const router = require('express').Router()

  // Healthcheck Route
  router.get('/health', (req, res) => res.json({ success: true, message: 'API is running smooth MasPur!' }))

  // --- Auth Routes ---
  router.post('/auth/register', authHandler.register)
  router.post('/auth/login', authHandler.login)

  // --- Categories Routes ---
  router.get('/categories', categoryHandler.getAll)

  // --- Materials Routes (Public & Learner) ---
  router.get('/materials', materiHandler.getAll)
  
  // --- Creator Routes (Perlu Auth & Ownership) ---
  router.post('/materials', authMiddleware, materiHandler.create)
  router.put('/materials/:id', authMiddleware, materiHandler.update)
  router.delete('/materials/:id', authMiddleware, materiHandler.remove) 
  
  router.get('/users/me/materials', authMiddleware, materiHandler.getUserMaterials)
  router.get('/materials/:slug', authMiddleware, materiHandler.getBySlug)

  // --- Gamification & Leaderboard Routes ---
  router.post('/materials/:id/complete', authMiddleware, gamificationHandler.complete)
  router.post('/materials/:id/ratings', authMiddleware, gamificationHandler.rate)
  router.get('/leaderboard', gamificationHandler.getLeaderboard)

  // --- Comments Routes ---
  router.get('/materials/:id/comments', commentHandler.getByMaterial)
  router.post('/materials/:id/comments', authMiddleware, commentHandler.create)

  // --- Admin Moderation Routes ---
  router.get('/admin/stats', authMiddleware, roleMiddleware('admin'), adminHandler.getStats) // new
  router.get('/admin/materials', authMiddleware, roleMiddleware('admin'), adminHandler.getPendingMaterials)
  router.patch('/admin/materials/:id/status', authMiddleware, roleMiddleware('admin'), adminHandler.updateStatus)
  
  // Admin Category Management Routes
  router.post('/admin/categories', authMiddleware, roleMiddleware('admin'), adminHandler.create)
  router.put('/admin/categories/:id', authMiddleware, roleMiddleware('admin'), adminHandler.update)
  router.delete('/admin/categories/:id', authMiddleware, roleMiddleware('admin'), adminHandler.remove)

  // Prefix All Routes with `/api/v1`
  app.use('/api/v1', router)
}