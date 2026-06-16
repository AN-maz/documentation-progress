const db = require("../../config/database");

const productService = {
  getProducts: async () => {
    const query = `
      SELECT p.id, p.name, p.price, c.id AS category_id, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
<<<<<<< HEAD
    `; 
=======
    `;

>>>>>>> 0673f2ffc473d3165ab51366aff4b444d87f3d64
    const [rows] = await db.query(query);
    return rows;
  },

  createProduct: async (productData) => {
    const { name, price, category_name } = productData;
<<<<<<< HEAD
    
    let categoryId;
    
=======

    let categoryId;

>>>>>>> 0673f2ffc473d3165ab51366aff4b444d87f3d64
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {
<<<<<<< HEAD

=======
>>>>>>> 0673f2ffc473d3165ab51366aff4b444d87f3d64
      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

<<<<<<< HEAD

=======
>>>>>>> 0673f2ffc473d3165ab51366aff4b444d87f3d64
    const query = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [name, price, categoryId]);
    
    return { id: result.insertId, name, price, category_name };
  },

  updateProduct: async (id, productData) => {
    const { name, price, category_name } = productData;

    let categoryId;
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {
      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

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
