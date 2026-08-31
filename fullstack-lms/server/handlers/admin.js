'use strict'
const adminService = require('../services/admin.service')

const getAll = async (req, res, next) => {
  try {
    const categories = await adminService.getAll()
    return res.status(200).json({
      success: true,
      message: 'Daftar kategori berhasil diambil',
      data: categories
    })
  } catch (err) {
    next(err)
  }
}

const getPendingMaterials = async (req, res, next) => {
  try {
    const materials = await adminService.getPendingMaterials()

    return res.status(200).json({
      success: true,
      message: 'Daftar materi pending berhasil diambil',
      data: materials
    })
  } catch (err) {
    next(err)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const materialId = req.params.id
    const { status, rejection_reason } = req.body

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status harus berisi "approved" atau "rejected"',
        errors: null
      })
    }

    if (status === 'rejected' && (!rejection_reason || rejection_reason.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'Alasan penolakan (rejection-reason) wajib diisi jika materi ditolak',
        errors: null
      })
    }

    const result = await adminService.updateStatus(materialId, status, rejection_reason)

    return res.status(200).json({
      success: true,
      message: `Status materi berhasil diperbarui menjadi ${status}`,
      data: result
    })
  } catch (err) {
    next(err)
  }
}

const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats()

    return res.status(200).json({
      success: true,
      message: 'Statistik dashboard admin berhasil diambil',
      data: stats
    })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const { name } = req.body

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Nama kategori wajib diisi',
        errors: null
      })
    }

    const newCategory = await adminService.createCategory(name.trim())

    return res.status(201).json({
      success: true,
      message: 'Kategori baru berhasil ditambahkan',
      data: newCategory
    })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const { name } = req.body

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Nama kategori wajib diisi',
        errors: null
      })
    }

    const updatedCategory = await adminService.updateCategory(categoryId, name.trim())

    return res.status(200).json({
      success: true,
      message: 'Kategori berhasil diperbarui',
      data: updatedCategory
    })
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const categoryId = req.params.id

    await adminService.removeCategory(categoryId)

    return res.status(200).json({
      success: true,
      message: 'Kategori berhasil dihapus',
      data: { id: Number(categoryId) }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll, 
  getPendingMaterials,
  updateStatus,
  getStats,
  create,
  update,
  remove
}