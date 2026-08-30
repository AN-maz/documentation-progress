'use strict'
const adminService = require('../services/admin.service')

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

module.exports = {
  getPendingMaterials,
  updateStatus
}