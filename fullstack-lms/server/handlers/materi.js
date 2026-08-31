'use strict'
const materiService = require('../services/materi.service')

// TAMBAHKAN FUNGSI INI
const getAll = async (req, res, next) => {
  try {
    const data = await materiService.getAll()
    return res.status(200).json({
      success: true,
      message: 'Daftar materi berhasil diambil',
      data
    })
  } catch (err) {
    next(err)
  }
}

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const userId = req.user ? req.user.id : null 
    const data = await materiService.getBySlug(slug, userId)

    return res.status(200).json({
      success: true,
      message: 'Detail materi berhasil diambil',
      data
    })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const authorId = req.user.id
    const { category_id, title, cover_image_url, content } = req.body

    if (!category_id || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Category ID, title, and content are required',
        errors: null
      })
    }

    const data = await materiService.create(authorId, { category_id, title, cover_image_url, content })

    return res.status(201).json({
      success: true,
      message: 'Materi berhasil diajukan dan menunggu persetujuan admin',
      data
    })
  } catch (err) {
    next(err)
  }
}

const getUserMaterials = async (req, res, next) => {
  try {
    const authorId = req.user.id
    const data = await materiService.getUserMaterials(authorId)

    return res.status(200).json({
      success: true,
      message: 'Daftar materi user berhasil diambil',
      data
    })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const authorId = req.user.id
    const materialId = req.params.id
    const { category_id, title, cover_image_url, content } = req.body

    if (!category_id || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Category ID, title, and content are required',
        errors: null
      })
    }

    const data = await materiService.update(materialId, authorId, {
      category_id,
      title,
      cover_image_url,
      content
    })

    return res.status(200).json({
      success: true,
      message: 'Materi berhasil diperbarui dan dikirim ulang untuk peninjauan admin',
      data
    })
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const authorId = req.user.id
    const materialId = req.params.id

    await materiService.remove(materialId, authorId)

    return res.status(200).json({
      success: true,
      message: 'Materi berhasil dihapus',
      data: { id: materialId }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll, // <-- DITAMBAHKAN DI SINI
  getBySlug,
  create,
  getUserMaterials,
  update,
  remove
}