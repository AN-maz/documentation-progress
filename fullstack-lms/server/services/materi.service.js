'use strict'
const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')
const slugify = require('../utils/slugify')

const getAllApproved = async ({ category_id, search, sort = 'latest', page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit
  let query = `
    SELECT 
      m.id, m.title, m.slug, m.cover_image_url, m.average_rating, m.ratings_count, m.created_at,
      u.id AS author_id, u.name AS author_name,
      c.id AS category_id, c.name AS category_name
    FROM materials m
    JOIN users u ON m.author_id = u.id
    JOIN categories c ON m.category_id = c.id
    WHERE m.status = 'approved'
  `
  const params = []

  if (category_id) {
    query += ' AND m.category_id = ?'
    params.push(category_id)
  }

  if (search) {
    query += ' AND (m.title LIKE ? OR m.content LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }

  if (sort === 'popular') {
    query += ' ORDER BY m.average_rating DESC, m.ratings_count DESC'
  } else {
    query += ' ORDER BY m.created_at DESC'
  }

  query += ' LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))

  const [materials] = await pool.query(query, params)
  const [totalRows] = await pool.query(
    "SELECT COUNT(*) as total FROM materials WHERE status = 'approved'",
    []
  )
  const totalItems = totalRows[0].total

  return {
    materials: materials.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      cover_image_url: item.cover_image_url,
      author: { id: item.author_id, name: item.author_name },
      category: { id: item.category_id, name: item.category_name },
      average_rating: parseFloat(item.average_rating),
      ratings_count: item.ratings_count,
      created_at: item.created_at
    })),
    pagination: {
      total_items: totalItems,
      total_pages: Math.ceil(totalItems / limit),
      current_page: parseInt(page),
      limit: parseInt(limit)
    }
  }
}

const getBySlug = async (slug, userId = null) => {
  const [rows] = await pool.query(
    `SELECT 
      m.id, m.title, m.slug, m.cover_image_url, m.content, m.average_rating, m.ratings_count, m.created_at,
      u.id AS author_id, u.name AS author_name, u.level AS author_level,
      c.id AS category_id, c.name AS category_name
    FROM materials m
    JOIN users u ON m.author_id = u.id
    JOIN categories c ON m.category_id = c.id
    WHERE m.slug = ? AND m.status = 'approved'`,
    [slug]
  )

  if (rows.length === 0) {
    const error = new Error('Materi tidak ditemukan')
    error.status = 404
    throw error
  }

  const material = rows[0]
  let userProgress = { is_completed: false, has_rated: false }

  if (userId) {
    const [progress] = await pool.query(
      'SELECT is_completed FROM reading_progress WHERE user_id = ? AND material_id = ?',
      [userId, material.id]
    )
    const [ratings] = await pool.query(
      'SELECT id FROM ratings WHERE user_id = ? AND material_id = ?',
      [userId, material.id]
    )

    userProgress = {
      is_completed: progress.length > 0 ? Boolean(progress[0].is_completed) : false,
      has_rated: ratings.length > 0
    }
  }

  return {
    id: material.id,
    title: material.title,
    slug: material.slug,
    cover_image_url: material.cover_image_url,
    content: material.content,
    author: { id: material.author_id, name: material.author_name, level: material.author_level },
    category: { id: material.category_id, name: material.category_name },
    average_rating: parseFloat(material.average_rating),
    ratings_count: material.ratings_count,
    user_progress: userProgress,
    created_at: material.created_at
  }
}

const create = async (authorId, { category_id, title, cover_image_url, content }) => {
  const id = uuidv4()
  const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`

  await pool.query(
    `INSERT INTO materials (id, author_id, category_id, title, slug, cover_image_url, content, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [id, authorId, category_id, title, slug, cover_image_url, content]
  )

  return {
    id,
    status: 'pending',
    created_at: new Date()
  }
}

const getUserMaterials = async (authorId) => {
  const [rows] = await pool.query(
    `SELECT 
      m.id, m.title, m.slug, m.cover_image_url, m.content, m.status, m.rejection_reason, m.created_at,
      c.id AS category_id, c.name AS category_name
     FROM materials m
     LEFT JOIN categories c ON m.category_id = c.id
     WHERE m.author_id = ? 
     ORDER BY m.created_at DESC`,
    [authorId]
  )
  
  return rows.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    cover_image_url: item.cover_image_url,
    content: item.content,
    status: item.status,
    rejection_reason: item.rejection_reason,
    created_at: item.created_at,
    category: item.category_id ? { id: item.category_id, name: item.category_name } : null
  }))
}

const update = async (materialId, authorId, { category_id, title, cover_image_url, content }) => {
  const [existing] = await pool.query(
    'SELECT id, status FROM materials WHERE id = ? AND author_id = ?',
    [materialId, authorId]
  )

  if (existing.length === 0) {
    const error = new Error('Materi tidak ditemukan atau kamu tidak memiliki hak akses')
    error.status = 404
    throw error
  }

  const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`

  await pool.query(
    `UPDATE materials 
     SET category_id = ?, title = ?, slug = ?, cover_image_url = ?, content = ?, status = 'pending', rejection_reason = NULL 
     WHERE id = ? AND author_id = ?`,
    [category_id, title, slug, cover_image_url, content, materialId, authorId]
  )

  return {
    id: materialId,
    status: 'pending',
    updated_at: new Date()
  }
}

const remove = async (materialId, authorId) => {
  const [existing] = await pool.query(
    'SELECT id FROM materials WHERE id = ? AND author_id = ?',
    [materialId, authorId]
  )

  if (existing.length === 0) {
    const error = new Error('Materi tidak ditemukan atau kamu tidak memiliki hak akses')
    error.status = 404
    throw error
  }

  await pool.query('DELETE FROM materials WHERE id = ? AND author_id = ?', [materialId, authorId])

  return { id: materialId }
}

module.exports = {
  getAllApproved,
  getBySlug,
  create,
  getUserMaterials,
  update,
  remove
}
