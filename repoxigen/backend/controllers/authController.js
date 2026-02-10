const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { nama, email, password, confirmPassword } = req.body;

  if (!nama || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Semua input harus diisi!" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password dan konfirmasi tidak cocok!" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    await db.query(
      "INSERT INTO users (nama_lengkap,email,password,status) VALUES (?,?,?,'pending')",
      [nama, email, hashPassword],
    );

    res.status(201).json({
      message: "Registrasi berhasil! Tunggu persetujuan Admin yak...",
    });
  } catch (err) {
    console.log("Registrasi Error", err);
    res.status(500).json({ message: "Terjadi kesalahan server!" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = users[0];

    if (user.status === "pending") {
      return res
        .status(403)
        .json({ message: "Akun Anda masih menunggu restu dari Admin..." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "password salah" }); // Nanti diganti ya
    }

    const userId = user.id;
    const nama = user.nama_lengkap;
    const emailUser = user.email;
    const role = user.status;

    const accessToken = jwt.sign(
      { userId, nama, emailUser, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { userId, nama, emailUser, role },
      process.env.REFRESH_TOKEN_SECRET,
    );

    await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      userId,
    ]);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const logout = async (req,res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const [users] = await db.query(
    "SELECT * FROM users WHERE refresh_token = ?",
    [refreshToken],
  );
  if (!users[0]) return res.sendStatus(204);

  const userId = users[0].id;
  await db.query("UPDATE users SET refresh_token = NULL WHERE id = ?", [
    userId,
  ]);

  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = {register,login,logout};
