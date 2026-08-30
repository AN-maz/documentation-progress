'use strict'
const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const calculateLevel = (totalExp) => Math.floor(totalExp / 100) + 1

const completeMaterial = async (userId, materialId) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [materials] = await connection.query(
      "SELECT id FROM materials WHERE id = ? AND status = 'approved'",
      [materialId]
    )
    if (materials.length === 0) {
      const error = new Error('Materi tidak ditemukan atau belum disetujui')
      error.status = 404
      throw error
    }
    const [progress] = await connection.query(
      'SELECT exp_rewarded FROM reading_progress WHERE user_id = ? AND material_id = ?',
      [userId, materialId]
    )

    if (progress.length > 0 && progress[0].exp_rewarded) {
      const error = new Error('Kamu sudah klaim EXP dari materi ini sebelumnya')
      error.status = 400
      throw error
    }

    const EXP_REWARD = 50
    const progressId = uuidv4()

    await connection.query(
      `INSERT INTO reading_progress (id, user_id, material_id, is_completed, exp_rewarded, completed_at)
       VALUES (?, ?, ?, 1, 1, NOW())
       ON DUPLICATE KEY UPDATE is_completed = 1, exp_rewarded = 1, completed_at = NOW()`,
      [progressId, userId, materialId]
    )


    const [users] = await connection.query('SELECT total_exp, level FROM users WHERE id = ?', [userId])
    const currentTotalExp = users[0].total_exp + EXP_REWARD
    const newLevel = calculateLevel(currentTotalExp)
    const isLevelUp = newLevel > users[0].level

    await connection.query(
      'UPDATE users SET total_exp = ?, level = ? WHERE id = ?',
      [currentTotalExp, newLevel, userId]
    )

    await connection.commit()

    return {
      exp_gained: EXP_REWARD,
      current_total_exp: currentTotalExp,
      current_level: newLevel,
      is_level_up: isLevelUp
    }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const rateMaterial = async (userId, materialId, ratingValue) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [materials] = await connection.query(
      "SELECT id, author_id FROM materials WHERE id = ? AND status = 'approved'",
      [materialId]
    )
    if (materials.length === 0) {
      const error = new Error('Materi tidak ditemukan')
      error.status = 404
      throw error
    }

    const authorId = materials[0].author_id

    const [existingRating] = await connection.query(
      'SELECT id FROM ratings WHERE user_id = ? AND material_id = ?',
      [userId, materialId]
    )

    if (existingRating.length > 0) {
      const error = new Error('Kamu sudah memberikan rating untuk materi ini')
      error.status = 400
      throw error
    }

    const ratingId = uuidv4()
    const POINT_REWARD = 10

    await connection.query(
      'INSERT INTO ratings (id, user_id, material_id, rating_value, point_rewarded) VALUES (?, ?, ?, ?, 1)',
      [ratingId, userId, materialId, ratingValue]
    )


    await connection.query('UPDATE users SET total_points = total_points + ? WHERE id = ?', [POINT_REWARD, userId])
    const [userRows] = await connection.query('SELECT total_points FROM users WHERE id = ?', [userId])

    if (ratingValue >= 4 && authorId !== userId) {
      const CREATOR_EXP_BONUS = 20
      const CREATOR_POINT_BONUS = 15

      const [authorRows] = await connection.query('SELECT total_exp FROM users WHERE id = ?', [authorId])
      const newAuthorExp = authorRows[0].total_exp + CREATOR_EXP_BONUS
      const newAuthorLevel = calculateLevel(newAuthorExp)

      await connection.query(
        'UPDATE users SET total_exp = ?, level = ?, total_points = total_points + ? WHERE id = ?',
        [newAuthorExp, newAuthorLevel, CREATOR_POINT_BONUS, authorId]
      )
    }

    const [ratingStats] = await connection.query(
      'SELECT AVG(rating_value) as avg_rating, COUNT(id) as count_rating FROM ratings WHERE material_id = ?',
      [materialId]
    )
    const newAverage = parseFloat(ratingStats[0].avg_rating).toFixed(2)
    const newCount = ratingStats[0].count_rating

    await connection.query(
      'UPDATE materials SET average_rating = ?, ratings_count = ? WHERE id = ?',
      [newAverage, newCount, materialId]
    )

    await connection.commit()

    return {
      points_gained: POINT_REWARD,
      current_total_points: userRows[0].total_points,
      new_average_rating: parseFloat(newAverage)
    }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const getLeaderboard = async () => {
  const [rows] = await pool.query(
    `SELECT 
      id AS user_id, name, level, total_exp 
     FROM users 
     WHERE role = 'learner'
     ORDER BY total_exp DESC, level DESC 
     LIMIT 50`
  )

  return rows.map((user, index) => ({
    rank: index + 1,
    user_id: user.user_id,
    name: user.name,
    level: user.level,
    total_exp: user.total_exp
  }))
}

module.exports = {
  completeMaterial,
  rateMaterial,
  getLeaderboard
}