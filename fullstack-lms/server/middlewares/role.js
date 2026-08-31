'use strict'

module.exports = function roleMiddleware(requiredRole) {
    return function(req, res, next) {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: 'Akses dilarang, Anda tidak memiliki izin untuk mengakses sumber daya ini.',
                errors: null
            })
        }
        next()
    }
}