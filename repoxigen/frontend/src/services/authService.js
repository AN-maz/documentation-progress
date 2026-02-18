import api from "./api";

const DIVISI_MAP = {
  software: "STF",
  hardware: "HRD",
  game: "GAM",
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });

      if (response.data.success || response.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
    } catch (err) {
      throw err.response ? err.response.data : { message: "Server Error" };
    }
  },

  register: async (formData) => {
    try {
      const kodeBackend = DIVISI_MAP[formData.divisi];

      if (!kodeBackend) {
        throw new Error("Pilihan Divisi tidak valid!");
      }

      const payload = {
        nama_lengkap: formData.fullName,
        nim: formData.nim,
        jurusan: formData.jurusan,
        email: formData.email,
        password: formData.password,

        kode_divisi: kodeBackend,
        alasan: formData.alasan,
      };

      console.log("Data yang dikirim ke Backend:", payload);
      
      const response = await api.post("/api/auth/register", payload);
      return response.data;
    } catch (err) {
      throw err.response ? err.response.data : { message: "Server Error" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};
