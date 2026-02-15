import * as agendaService from "../services/agendaService.js";

export const createAgenda = async (req, res) => {
  try {
    const newAgenda = await agendaService.createAgenda(
      req.body,
      req.user.id_akun,
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
    const agenda = await agendaService.getAllAgenda();

    res.status(200).json({
      status: true,
      message: "List agenda berhasil dimuat",
      data: agenda,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getParticipants = async (req,res) => {

  try{
    const {id_agenda} = req.params;

    const result = await agendaService.getAgendaPartisipants(id_agenda);

    res.status(200).json({
      status:true,
      message: "Data presensi berhasil ditarik",
      data: result
    });
  }catch(err){
    res.status(400).json({
      status:false,
      message: err.message
    });
  }
}
