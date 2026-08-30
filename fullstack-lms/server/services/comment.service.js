'use strict'
const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const getByMaterial = async (materialId) => {
  const [rows] = await pool.query(
    `SELECT 
      c.id, c.comment_text, c.created_at,
      u.id AS user_id, u.name AS user_name, u.level AS user_level
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.material_id = ?
    ORDER BY c.created_at DESC`,
    [materialId]
  )

  return rows.map(item => ({
    id: item.id,
    comment_text: item.comment_text,
    created_at: item.created_at,
    user: {
      id: item.user_id,
      name: item.user_name,
      level: item.user_level
    }
  }))
}

const create = async (userId, materialId, commentText) => {
  const id = uuidv4()
  await pool.query(
    'INSERT INTO comments (id, user_id, material_id, comment_text, created_at) VALUES (?, ?, ?, ?, NOW())',
    [id, userId, materialId, commentText]
  )

  const [user] = await pool.query('SELECT name, level FROM users WHERE id = ?', [userId])

  return {
    id,
    comment_text: commentText,
    created_at: new Date(),
    user: {
      id: userId,
      name: user[0].name,
      level: user[0].level
    }
  }
}

module.exports = {
  getByMaterial,
  create
}