'use strict'
const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak. Token tidak ditemukan.',
            errors:null
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err) {
        return res.status(403).json({
            success: false,
            message: 'Token tidak valid atau sudah kadaluarsa.',
            errors: null
        })

    }
}