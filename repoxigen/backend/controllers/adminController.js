const db = require("../config/database");
const { generateNomorInduk } = require("../utils/idGenerator");

const Approveuser = async (req, res) => {
  const { userId } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const user = users[0];

    const newId = await generateNomorInduk(user.divisi_id, user.angkatan);

    await db.query(
      "UPDATE users SET status = 'aktif', nomor_induk = ? WHERE id = ?",
      [newId, userId],
    );

    res.josn({ message: "User berhasil di-approve!", nomor_induk: newId });
  } catch (err) {
    res.status(500).json({message:'Gagal approve user!'})
  }
};
