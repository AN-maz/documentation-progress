'use strict'
const pool = require('../config/database')

const calculateLevel = (totalExp) => Math.floor(totalExp / 100) + 1

const getPendingMaterials = async () => {
  const [rows] = await pool.query(
    `SELECT 
      m.id, m.title, m.slug, m.cover_image_url, m.content, m.created_at,
      u.id AS author_id, u.name AS author_name,
      c.name AS category_name
    FROM materials m
    JOIN users u ON m.author_id = u.id
    JOIN categories c ON m.category_id = c.id
    WHERE m.status = 'pending'
    ORDER BY m.created_at ASC`
  )
  return rows
}

const updateStatus = async (materialId, status, rejectionReason = null) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [materials] = await connection.query(
      'SELECT id, author_id, status FROM materials WHERE id = ?',
      [materialId]
    )

    if (materials.length === 0) {
      const error = new Error('Materi tidak ditemukan')
      error.status = 404
      throw error
    }

    const material = materials[0]
    if (material.status !== 'pending') {
      const error = new Error('Materi ini sudah ditinjau sebelumnya')
      error.status = 400
      throw error
    }

    await connection.query(
      'UPDATE materials SET status = ?, rejection_reason = ? WHERE id = ?',
      [status, status === 'rejected' ? rejectionReason : null, materialId]
    )

    if (status === 'approved') {
      const AUTHOR_EXP_REWARD = 200
      const [authors] = await connection.query('SELECT total_exp FROM users WHERE id = ?', [material.author_id])
      const newTotalExp = authors[0].total_exp + AUTHOR_EXP_REWARD
      const newLevel = calculateLevel(newTotalExp)

      await connection.query(
        'UPDATE users SET total_exp = ?, level = ? WHERE id = ?',
        [newTotalExp, newLevel, material.author_id]
      )
    }

    await connection.commit()

    return {
      material_id: materialId,
      status,
      rejection_reason: status === 'rejected' ? rejectionReason : null
    }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

module.exports = {
  getPendingMaterials,
  updateStatus
}