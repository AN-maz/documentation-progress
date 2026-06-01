// routes/posRoutes.js

const express = require('express')
const router  = express.Router()

const {
  getAllPos,
  getPosById,
  createPos,
  updatePos,
  deletePos
} = require('../controllers/pos.controller')

router.get('/',      getAllPos)
router.get('/:id',   getPosById)
router.post('/',     createPos)
router.put('/:id',   updatePos)
router.delete('/:id',deletePos)

module.exports = router
