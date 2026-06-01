const db = require("../config/database");

const getAllLaporan = () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT
        l.id, l.no_laporan, l.tanggal_kejadian, l.alamat_kejadian,
        l.kelurahan, l.tingkat_bahaya, l.status, l.keterangan,
        p.nama_pos AS nama_pos_penanganan, p.wilayah AS wilayah_pos, p.no_telp AS telp_pos
      FROM laporan_kebakaran l
      INNER JOIN pos_pemadam p ON l.pos_id = p.id
      ORDER BY l.tanggal_kejadian DESC
    `;

    db.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getLaporanById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        l.id, l.no_laporan, l.tanggal_kejadian, l.alamat_kejadian,
        l.kelurahan, l.tingkat_bahaya, l.status, l.keterangan, l.created_at,
        p.id AS pos_id, p.nama_pos AS nama_pos_penanganan,
        p.wilayah AS wilayah_pos, p.alamat AS alamat_pos, p.no_telp AS telp_pos
      FROM laporan_kebakaran l
      INNER JOIN pos_pemadam p ON l.pos_id = p.id
      WHERE l.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getLaporanByStatus = (status) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        l.id, l.no_laporan, l.tanggal_kejadian, l.alamat_kejadian,
        l.tingkat_bahaya, l.status,
        p.nama_pos AS nama_pos_penanganan, p.wilayah AS wilayah_pos
      FROM laporan_kebakaran l
      INNER JOIN pos_pemadam p ON l.pos_id = p.id
      WHERE l.status = ?
      ORDER BY l.tanggal_kejadian DESC
    `;
    db.query(query, [status], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const createLaporan = (data) => {
  return new Promise((resolve, reject) => {
    const {
      no_laporan,
      tanggal_kejadian,
      alamat_kejadian,
      kelurahan,
      tingkat_bahaya,
      keterangan,
      pos_id,
    } = data;
    const query = `
      INSERT INTO laporan_kebakaran
        (no_laporan, tanggal_kejadian, alamat_kejadian, kelurahan, tingkat_bahaya, keterangan, pos_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        no_laporan,
        tanggal_kejadian,
        alamat_kejadian,
        kelurahan,
        tingkat_bahaya || "sedang",
        keterangan,
        pos_id,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const updateStatusLaporan = (id, status, keterangan) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE laporan_kebakaran SET status = ?, keterangan = ? WHERE id = ?";
    db.query(query, [status, keterangan, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const deleteLaporan = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM laporan_kebakaran WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  getAllLaporan,
  getLaporanById,
  getLaporanByStatus,
  createLaporan,
  updateStatusLaporan,
  deleteLaporan,
};
