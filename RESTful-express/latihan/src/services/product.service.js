const db = require("../../config/database");

const productService = {
  getProducts: async () => {
    const query = `
            SELECT p.id, p.name, p.price, c.name AS category_name
            FROM products p
            INNER JOIN categories c ON p.category_id = c.id
        `;

    const [rows] = await db.query(query);
    return rows;
  },
  createProduct: async (productData) => {
    const { name, price, category_id } = productData;
    const query =
      "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [name, price, category_id]);
    return { id: result.insertId, ...productData };
  },
  updateProduct: async (id, productData) => {
    const { name, price, category_id } = productData;
    const query =
      "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?";
    const [result] = await db.query(query, [name, price, category_id, id]);
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
