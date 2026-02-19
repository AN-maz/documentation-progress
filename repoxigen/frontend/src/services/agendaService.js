import api from "./api";


export const agendaService = {
  
  getAllAgendas: async () => {
    try {
      const response = await api.get("/api/agendas");
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: "Gagal mengambil data agenda" };
    }
  },

  getAgendaById: async (id) => {
    try {
      const response = await api.get(`/api/agendas/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Gagal mengambil detail agenda" }
      );
    }
  },

  absenAgenda: async (id_agenda, token_absen) => {
    try {
      const response = await api.post(`/api/agendas/${id_agenda}/absen`, {
        token_absen,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Gagal melakukan absensi" };
    }
  },
};