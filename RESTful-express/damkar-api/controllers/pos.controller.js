const posService = require('../services/pos.service')

// GET /api/pos — Ambil semua pos pemadam
const getAllPos = async (req, res) => {
  try {
    const results = await posService.getAllPos()
    res.json({
      success: true,
      total: results.length,
      data: results
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/pos/:id — Ambil 1 pos berdasarkan ID
const getPosById = async (req, res) => {
  const { id } = req.params

  try {
    const results = await posService.getPosById(id)
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Pos tidak ditemukan' })
    }

    res.json({ success: true, data: results[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// POST /api/pos — Tambah pos baru
const createPos = async (req, res) => {
  const { nama_pos, wilayah, alamat } = req.body

  if (!nama_pos || !wilayah || !alamat) {
    return res.status(400).json({ 
      success: false, 
      message: 'nama_pos, wilayah, dan alamat wajib diisi' 
    })
  }

  try {
    const result = await posService.createPos(req.body)
    res.status(201).json({
      success: true,
      message: 'Pos berhasil ditambahkan',
      data: { id: result.insertId, ...req.body }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// PUT /api/pos/:id — Update data pos
const updatePos = async (req, res) => {
  const { id } = req.params

  try {
    const result = await posService.updatePos(id, req.body)
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Pos tidak ditemukan' })
    }

    res.json({ success: true, message: 'Pos berhasil diupdate' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE /api/pos/:id — Hapus pos
const deletePos = async (req, res) => {
  const { id } = req.params

  try {
    const result = await posService.deletePos(id)
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Pos tidak ditemukan' })
    }

    res.json({ success: true, message: 'Pos berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { 
  getAllPos, 
  getPosById, 
  createPos, 
  updatePos, 
  deletePos 
}