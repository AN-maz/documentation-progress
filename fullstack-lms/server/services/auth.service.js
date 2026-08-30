const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (name, email, password) => {
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if(existingUser.length > 0) {
        const error = new Error("Email Sudah Terdaftar");
        error.status = 400;
        throw error;
    }

    const userId = uuidv4();
    const passwordHash = await bcrypt.hash(password,10);

    await pool.query("INSERT INTO users (id,name,email,password_hash,role) VALUES (?,?,?,?,?)",[userId,name,email,passwordHash,"learner"]);

    return { id: userId, name, email, role: "learner" };
};

const login = async (email, password) => {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?" ,[email]);
    if(users.length === 0) {
        const error = new Error("Email atau Password Salah");
        error.status = 400;
        throw error;
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if(!isMatch) {
        const error = new Error("Email atau Password Salah");
        error.status = 400;
        throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = {register, login};