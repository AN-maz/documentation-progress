import * as adminService from "../services/adminService.js";

export const getPendingList = async (req, res) => {
  try {
    const users = await adminService.getPendingUsers();

    res.status(200).json({
      status: true,
      message: "List pendaftar baru berhasil diambil",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const approveMember = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID wajib diisi",
      });
    }

    const result = await adminService.approveUser(userId);

    res.status(200).json({
      status: "success",
      message: "omke Gas! dapat member baru kawan (approve/pasif)",
      data: {
        nama: result.user.nama_lengkap,
        status: result.user.status_keanggotaan,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const rejectMember = async (req, res) => {
  try {
    const { userId } = req.body;

    await adminService.rejectMember(userId);

    res.status(200).json({
      succes: true,
      message: "Pendaftar berhasil ditolak dan dihapus dari sistem",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
