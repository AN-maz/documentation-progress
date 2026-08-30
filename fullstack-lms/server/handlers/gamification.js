'use strict'
const gamificationService = require('../services/gamification.service')

const complete = async (req, res, next) => {
  try {
    const userId = req.user.id
    const materialId = req.params.id

    const data = await gamificationService.completeMaterial(userId, materialId)

    return res.status(200).json({
      success: true,
      message: `Materi selesai dibaca! Kamu mendapatkan +${data.exp_gained} EXP`,
      data
    })
  } catch (err) {
    next(err)
  }
}

const rate = async (req, res, next) => {
  try {
    const userId = req.user.id
    const materialId = req.params.id
    const { rating_value } = req.body

    if (!rating_value || rating_value < 1 || rating_value > 5) {
      return res.status(400).json({
        success: false,
        message: 'Nilai rating wajib diisi antara 1 sampai 5',
        errors: null
      })
    }

    const data = await gamificationService.rateMaterial(userId, materialId, rating_value)

    return res.status(201).json({
      success: true,
      message: `Rating berhasil dikirim! Kamu mendapatkan +${data.points_gained} Points`,
      data
    })
  } catch (err) {
    next(err)
  }
}

const getLeaderboard = async (req, res, next) => {
  try {
    const data = await gamificationService.getLeaderboard()

    return res.status(200).json({
      success: true,
      message: 'Papan peringkat berhasil diambil',
      data
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  complete,
  rate,
  getLeaderboard
}