import * as agendaService from "../services/agendaService.js";

export const createAgenda = async (req, res) => {
  try {
    const { id_akun, role, kelola_divisi } = req.user;

    const newAgenda = await agendaService.createAgenda(
      req.body,
      // req.user.id_akun,
      id_akun,
      role,
      kelola_divisi,
    );

    res.status(201).json({
      status: true,
      message: "Agenda berhasil dibuat",
      data: newAgenda,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getAllAgenda = async (req, res) => {
  try {
    const { role, kelola_divisi, id_akun } = req.user;
    const agendas = await agendaService.getAllAgenda(role, kelola_divisi, id_akun);

    res.status(200).json({
      status: true,
      message: "List agenda berhasil dimuat",
      data: agendas,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { role, kelola_divisi } = req.user;

    const result = await agendaService.getAgendaPartisipants(
      id_agenda,
      role,
      kelola_divisi,
    );

    res.status(200).json({
      status: true,
      message: "Data presensi berhasil ditarik",
      data: result,
    });
  } catch (err) {
    if (err.message.includes("Dilarang")) {
      return res.status(403).json({ status: false, messaga: err.message });
    }
    res.status(400).json({ status: false, message: err.message });
  }
};
