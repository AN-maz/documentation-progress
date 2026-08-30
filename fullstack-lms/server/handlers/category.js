'use strict'
const categoryService = require('../services/category.service')

const getAll = async (req,res, next) => {
    try{
        const categories = await categoryService.getAll();
        return res.status(200).json({
            success: true,
            message: 'Daftar kategori berhasil diambil',
            data:categories
        })
    }catch(err){
        next(err)
    }
}

module.exports = {getAll}