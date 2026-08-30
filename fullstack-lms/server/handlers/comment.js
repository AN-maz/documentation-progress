'use strict'
const commentService = require('../services/comment.service')

const getByMaterial = async (req, res, next) => {
  try {
    const materialId = req.params.id
    const comments = await commentService.getByMaterial(materialId)

    return res.status(200).json({
      success: true,
      message: 'Daftar komentar berhasil diambil',
      data: comments
    })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const materialId = req.params.id
    const { comment_text } = req.body

    if (!comment_text || comment_text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Teks komentar tidak boleh kosong',
        errors: null
      })
    }

    const newComment = await commentService.create(userId, materialId, comment_text)

    return res.status(201).json({
      success: true,
      message: 'Komentar berhasil ditambahkan',
      data: newComment
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getByMaterial,
  create
}