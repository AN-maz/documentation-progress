const db = require("../../config/database");

const productService = {
  getProducts: async () => {
    const query = `
      SELECT p.id, p.name, p.price, c.id AS category_id, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
    `; // Sedikit tips: tambahkan c.id AS category_id agar memudahkan frontend saat mode edit nanti

    const [rows] = await db.query(query);
    return rows;
  },

  createProduct: async (productData) => {
    const { name, price, category_name } = productData;
    
    // 1. Logika Cek atau Buat Kategori Baru
    let categoryId;
    
    // Cek apakah kategori sudah ada
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {
      // Jika belum ada, buat baru
      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

    // 2. Insert Produk Menggunakan categoryId yang Tepat
    const query = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [name, price, categoryId]);
    
    return { id: result.insertId, name, price, category_name };
  },

  updateProduct: async (id, productData) => {
    const { name, price, category_name } = productData;

    // 1. Logika Cek atau Buat Kategori Baru saat Update
    let categoryId;
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {
      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

    // 2. Update data produk dengan categoryId yang baru/ditemukan
    const query = "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?";
    const [result] = await db.query(query, [name, price, categoryId, id]);
    
    return result.affectedRows;
  },

  deleteProduct: async (id) => {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  },

  getProductById: async (id) => {
    const query = `
      SELECT p.id, p.name, p.price, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = productService;