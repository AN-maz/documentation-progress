'use strict'
const pool = require('../config/database')


const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') 
}


// const getAll = async () => {
//   const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC')
//   return rows
// }

const createCategory = async (name) => {
  const slug = slugify(name)
  
  const [existing] = await pool.query('SELECT id FROM categories WHERE slug = ? OR name = ?', [slug, name])
  if (existing.length > 0) {
    const error = new Error('Kategori dengan nama tersebut sudah ada')
    error.status = 400
    throw error
  }

  const [result] = await pool.query(
    'INSERT INTO categories (name, slug) VALUES (?, ?)',
    [name, slug]
  )

  return {
    id: result.insertId,
    name,
    slug
  }
}

const updateCategory = async (id, name) => {
  const slug = slugify(name)

  const [categories] = await pool.query('SELECT id FROM categories WHERE id = ?', [id])
  if (categories.length === 0) {
    const error = new Error('Kategori tidak ditemukan')
    error.status = 404
    throw error
  }

  // Cek bentrok nama/slug dengan kategori lain
  const [existing] = await pool.query(
    'SELECT id FROM categories WHERE (slug = ? OR name = ?) AND id != ?',
    [slug, name, id]
  )
  if (existing.length > 0) {
    const error = new Error('Kategori lain dengan nama tersebut sudah ada')
    error.status = 400
    throw error
  }

  await pool.query(
    'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
    [name, slug, id]
  )

  return {
    id: Number(id),
    name,
    slug
  }
}

const removeCategory = async (id) => {
  const [categories] = await pool.query('SELECT id FROM categories WHERE id = ?', [id])
  if (categories.length === 0) {
    const error = new Error('Kategori tidak ditemukan')
    error.status = 404
    throw error
  }

  const [materials] = await pool.query('SELECT id FROM materials WHERE category_id = ? LIMIT 1', [id])
  if (materials.length > 0) {
    const error = new Error('Kategori tidak dapat dihapus karena masih digunakan oleh materi')
    error.status = 400
    throw error
  }

  await pool.query('DELETE FROM categories WHERE id = ?', [id])
  return { id: Number(id) }
}

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

const getDashboardStats = async () => {
  const [
    [userCountResult],
    [pendingCountResult],
    [approvedCountResult],
    [completionCountResult]
  ] = await Promise.all([
    pool.query('SELECT COUNT(id) AS total FROM users'),
    pool.query("SELECT COUNT(id) AS total FROM materials WHERE status = 'pending'"),
    pool.query("SELECT COUNT(id) AS total FROM materials WHERE status = 'approved'"),
    pool.query('SELECT COUNT(id) AS total FROM user_completions') // Sesuaikan nama tabel log penyelesaian materi jika berbeda
  ])

  return {
    total_users: userCountResult[0].total,
    total_pending_materials: pendingCountResult[0].total,
    total_approved_materials: approvedCountResult[0].total,
    total_completions: completionCountResult[0].total
  }
}

module.exports = {
  getPendingMaterials,
  updateStatus,
  getDashboardStats,
  // getAll,
  createCategory,
  updateCategory,
  removeCategory
}