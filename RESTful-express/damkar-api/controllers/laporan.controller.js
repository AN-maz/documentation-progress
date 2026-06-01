const laporanService = require('../services/laporan.service')

// -------------------------------------------------------
// GET /api/laporan — Ambil semua laporan
// -------------------------------------------------------
const getAllLaporan = async (req, res) => {
  try {
    const results = await laporanService.getAllLaporan()
    res.json({
      success: true,
      total: results.length,
      data: results
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// -------------------------------------------------------
// GET /api/laporan/:id — Detail 1 laporan
// -------------------------------------------------------
const getLaporanById = async (req, res) => {
  const { id } = req.params

  try {
    const results = await laporanService.getLaporanById(id)
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' })
    }

    res.json({ success: true, data: results[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// -------------------------------------------------------
// GET /api/laporan/status/:status — Filter by status
// -------------------------------------------------------
const getLaporanByStatus = async (req, res) => {
  const { status } = req.params
  const validStatus = ['proses', 'selesai', 'batal']

  if (!validStatus.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: `Status tidak valid. Gunakan: ${validStatus.join(', ')}` 
    })
  }

  try {
    const results = await laporanService.getLaporanByStatus(status)
    res.json({
      success: true,
      status_filter: status,
      total: results.length,
      data: results
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// -------------------------------------------------------
// POST /api/laporan — Buat laporan baru
// -------------------------------------------------------
const createLaporan = async (req, res) => {
  const { no_laporan, tanggal_kejadian, alamat_kejadian, pos_id } = req.body

  if (!no_laporan || !tanggal_kejadian || !alamat_kejadian || !pos_id) {
    return res.status(400).json({
      success: false,
      message: 'no_laporan, tanggal_kejadian, alamat_kejadian, dan pos_id wajib diisi'
    })
  }

  try {
    const result = await laporanService.createLaporan(req.body)
    res.status(201).json({
      success: true,
      message: 'Laporan berhasil dibuat',
      data: { id: result.insertId, no_laporan }
    })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'No laporan sudah digunakan' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// -------------------------------------------------------
// PUT /api/laporan/:id — Update status laporan
// -------------------------------------------------------
const updateStatusLaporan = async (req, res) => {
  const { id } = req.params
  const { status, keterangan } = req.body

  const validStatus = ['proses', 'selesai', 'batal']
  if (!validStatus.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: `Status tidak valid. Gunakan: ${validStatus.join(', ')}` 
    })
  }

  try {
    const result = await laporanService.updateStatusLaporan(id, status, keterangan)
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' })
    }

    res.json({ success: true, message: `Status laporan berhasil diubah menjadi "${status}"` })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// -------------------------------------------------------
// DELETE /api/laporan/:id — Hapus laporan
// -------------------------------------------------------
const deleteLaporan = async (req, res) => {
  const { id } = req.params

  try {
    const result = await laporanService.deleteLaporan(id)
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' })
    }

    res.json({ success: true, message: 'Laporan berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {
  getAllLaporan,
  getLaporanById,
  getLaporanByStatus,
  createLaporan,
  updateStatusLaporan,
  deleteLaporan
}