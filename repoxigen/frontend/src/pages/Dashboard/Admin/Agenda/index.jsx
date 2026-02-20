// src/pages/Dashboard/Admin/Agenda/index.jsx
import React, { useState, useEffect } from 'react';
import { agendaService } from '../../../../services/agendaService';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminAgendaList = () => {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data user dari localstorage untuk filter divisi (Opsional, tergantung backend)
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const res = await agendaService.getAllAgendas();
        if (res.status && res.data) {
          // Frontend Filter: Hanya tampilkan agenda yang divisinya sama dengan admin
          // (Sebaiknya backend yang memfilter, tapi ini jaga-jaga)
          const filteredAgendas = res.data.filter(
            (agenda) => agenda.id_divisi === user?.divisi_peminatan_id
          );
          setAgendas(filteredAgendas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendas();
  }, [user?.divisi_peminatan_id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Data Agenda...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Agenda</h1>
          <p className="text-gray-500 text-sm">Kelola kegiatan untuk divisi Anda.</p>
        </div>
        <button className="flex items-center gap-2 bg-oxigen-dark text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-900 transition-colors">
          <Plus size={18} /> Buat Agenda Baru
        </button>
      </div>

      {/* Tabel Agenda */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase">
                <th className="p-4 font-bold">Judul Kegiatan</th>
                <th className="p-4 font-bold">Tanggal</th>
                <th className="p-4 font-bold">Token</th>
                <th className="p-4 font-bold text-center">Status Absen</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {agendas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">Belum ada agenda di divisi ini.</td>
                </tr>
              ) : (
                agendas.map((agenda) => (
                  <tr key={agenda.id_agenda} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-bold text-gray-800">{agenda.judul}</p>
                      <p className="text-xs text-gray-500 capitalize">{agenda.kategori} • {agenda.lokasi}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(agenda.tanggal).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm tracking-wider font-bold text-gray-700">
                        {agenda.token_absen}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${agenda.is_absen_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {agenda.is_absen_open ? 'Buka' : 'Tutup'}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAgendaList;