const db = require("../config/database");

const getAllPos = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM pos_pemadam ORDER BY id ASC";
    db.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getPosById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM pos_pemadam WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const createPos = (data) => {
  return new Promise((resolve, reject) => {
    const { nama_pos, wilayah, alamat, no_telp } = data;
    const query =
      "INSERT INTO pos_pemadam (nama_pos, wilayah, alamat, no_telp) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [nama_pos, wilayah, alamat, no_telp || null],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const updatePos = (id, data) => {
  return new Promise((resolve, reject) => {
    const { nama_pos, wilayah, alamat, no_telp } = data;
    const query = `
      UPDATE pos_pemadam
      SET nama_pos = ?, wilayah = ?, alamat = ?, no_telp = ?
      WHERE id = ?
    `;
    db.query(query, [nama_pos, wilayah, alamat, no_telp, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const deletePos = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM pos_pemadam WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  getAllPos,
  getPosById,
  createPos,
  updatePos,
  deletePos,
};
