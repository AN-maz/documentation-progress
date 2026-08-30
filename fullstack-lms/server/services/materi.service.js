'use strict'
const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')
const slugify = require('../utils/slugify')

// 1. Dapatkan katalog materi publik (status: approved)
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

  // Hitung total items untuk pagination
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

// 2. Detail materi berdasarkan slug
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

  // Cek progres pengguna jika user sedang terautentikasi
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

// 3. Creator membuat materi baru (status pending)
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

// 4. Creator melihat materi buatan sendiri
const getUserMaterials = async (authorId) => {
  const [rows] = await pool.query(
    `SELECT id, title, status, rejection_reason, created_at 
     FROM materials 
     WHERE author_id = ? 
     ORDER BY created_at DESC`,
    [authorId]
  )
  return rows
}

module.exports = {
  getAllApproved,
  getBySlug,
  create,
  getUserMaterials
}