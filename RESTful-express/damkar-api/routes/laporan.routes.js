// routes/laporanRoutes.js

const express = require('express')
const router  = express.Router()

const {
  getAllLaporan,
  getLaporanById,
  getLaporanByStatus,
  createLaporan,
  updateStatusLaporan,
  deleteLaporan
} = require('../controllers/laporan.controller')

router.get('/',              getAllLaporan)
router.get('/status/:status',getLaporanByStatus)   // ⚠️ harus sebelum /:id
router.get('/:id',           getLaporanById)
router.post('/',             createLaporan)
router.put('/:id',           updateStatusLaporan)
router.delete('/:id',        deleteLaporan)

module.exports = router
