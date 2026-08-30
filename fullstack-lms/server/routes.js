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
  router.put('/materials/:id', authMiddleware, materiHandler.update)
  router.get('/materials/:slug', materiHandler.getBySlug)

  // --- Creator Routes ---
  router.post('/materials', authMiddleware, materiHandler.create)
  router.get('/users/me/materials', authMiddleware, materiHandler.getUserMaterials)

  // --- Gamification & Leaderboard Routes ---
  router.post('/materials/:id/complete', authMiddleware, gamificationHandler.complete)
  router.post('/materials/:id/ratings', authMiddleware, gamificationHandler.rate)
  router.get('/leaderboard', gamificationHandler.getLeaderboard)

  // --- Comments Routes ---
  router.get('/materials/:id/comments', commentHandler.getByMaterial)
  router.post('/materials/:id/comments', authMiddleware, commentHandler.create)

  // --- Admin Moderation Routes ---
  router.get('/admin/materials', authMiddleware, roleMiddleware('admin'), adminHandler.getPendingMaterials)
  router.patch('/admin/materials/:id/status', authMiddleware, roleMiddleware('admin'), adminHandler.updateStatus)

  // Prefix All Routes with `/api/v1`
  app.use('/api/v1', router)
}