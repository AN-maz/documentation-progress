'use strict'
const pool = require('../config/database');

const getAll = async () => {
    const [rows] = await pool.query('SELECT id, name, slug, description FROM categories ORDER BY name ASC');
    return rows;
}

module.exports = {
    getAll
}