import { prisma } from "../lib/prisma.ts";

export const getPendingUsers = async () => {
  return await prisma.users.findMany({
    where: {
      status_keanggotaan: "pending",
    },
    include: {
      akun: {
        select: { email: true, is_approved: true },
      },
      divisi: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const approveUser = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const updatedAccount = await tx.akun.update({
      where: { id_akun: userId },
      data: { is_approved: true },
    });

    const updatedUser = await tx.users.update({
      where: { id_akun: userId },
      data: { status_keanggotaan: "pasif" },
    });

    return { account: updatedAccount, user: updatedUser };
  });
};

export const rejectUser = async (userId) => {
  return await prisma.akun.delete({
    where: { id_akun: userId },
  });
};
