import { userInfo } from "node:os";
import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Silahkan tunggu Approval dari admin ya...",
      data: {
        nim: result.user.nim,
        nama: result.user.nama,
        divisi: result.user.divisi_peminatan_id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req,res) => {
  res.send("Login Endpoint!")
}
