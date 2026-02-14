import * as absensiService from "../services/absensiService.js";

export const submitAbsensi = async (req, res) => {
  try {
    const { id_agenda, token_input } = req.body;
    const userNim = req.user.nim;

    const dataAbsen = await absensiService.submitAbsensi(
      id_agenda,
      token_input,
      userNim,
    );

    res.status(200).json({
      status: true,
      message: "Absensi berhasil dicatat! Omke Gas belajarnya ya",
      data: dataAbsen,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};
