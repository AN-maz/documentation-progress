import { prisma } from "../lib/prisma.ts";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id_akun;

    const userProfile = await prisma.users.findFirst({
      where: { id_akun: userId },
      include: {
        divisi: true,
      },
    });

    if (!userProfile) {
      return res.status(404).json({
        status: false,
        message: "Profile user tidak ditemukan",
      });
    }

    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data profile",
      data: userProfile,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
