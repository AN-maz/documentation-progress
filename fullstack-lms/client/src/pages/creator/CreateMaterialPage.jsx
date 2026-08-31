// src/pages/creator/CreateMaterialPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useThemeStore } from '../../store/useThemeStore';
import { materialService } from '../../api/materi.service';
import { ArrowLeft, Send, Eye, Edit3, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateMaterialPage() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'

  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    cover_image_url: '',
    content: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await materialService.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Gagal mengambil data kategori:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category_id || !formData.content) {
      toast.error('Judul, Kategori, dan Isi Materi wajib diisi!');
      return;
    }

    try {
      setSubmitting(true);
      const res = await materialService.createMaterial(formData);
      if (res.success) {
        toast.success('Materi berhasil diajukan! Menunggu peninjauan admin.');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error create material:', err);
      toast.error(err.response?.data?.message || 'Gagal mengajukan materi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className={`inline-flex items-center gap-2 text-xs font-semibold transition ${
            isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>
        <h1 className="text-xl font-bold">Editor Buat Materi Baru</h1>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        
        {/* Input Judul */}
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Judul Materi *
          </label>
          <input
            type="text"
            name="title"
            placeholder="Contoh: Panduan Lengkap RESTful API dengan Express.js"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
              isDark 
                ? 'bg-slate-950 text-slate-100 border-slate-800 placeholder:text-slate-500' 
                : 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400'
            }`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pilihan Kategori */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Kategori *
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer ${
                isDark 
                  ? 'bg-slate-950 text-slate-100 border-slate-800' 
                  : 'bg-white text-slate-900 border-slate-300'
              }`}
              required
            >
              <option value="" className={isDark ? 'bg-slate-900 text-slate-400' : 'text-slate-400'}>
                -- Pilih Kategori --
              </option>
              {categories.map((cat) => (
                <option 
                  key={cat.id} 
                  value={cat.id} 
                  className={isDark ? 'bg-slate-900 text-slate-100' : 'text-slate-900'}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input URL Cover Image */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              URL Gambar Sampul (Opsional)
            </label>
            <input
              type="url"
              name="cover_image_url"
              placeholder="https://example.com/image.png"
              value={formData.cover_image_url}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                isDark 
                  ? 'bg-slate-950 text-slate-100 border-slate-800 placeholder:text-slate-500' 
                  : 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Area Markdown dengan Tab Write & Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Konten Materi (Markdown) *
            </label>

            {/* Toggle Tab */}
            <div className={`flex p-1 rounded-xl border text-xs font-bold ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                  activeTab === 'write'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Tulis
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                  activeTab === 'preview'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>
          </div>

          {activeTab === 'write' ? (
            <textarea
              name="content"
              rows={14}
              placeholder="Tulis materi pembelajaran menggunakan format Markdown..."
              value={formData.content}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl border text-sm font-mono transition focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                isDark 
                  ? 'bg-slate-950 text-slate-100 border-slate-800 placeholder:text-slate-500' 
                  : 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400'
              }`}
              required
            />
          ) : (
            <div className={`min-h-[350px] p-6 rounded-xl border prose max-w-none ${
              isDark 
                ? 'bg-slate-950 border-slate-800 text-slate-200 prose-invert' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              {formData.content ? (
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              ) : (
                <span className="text-xs text-slate-400 italic">Belum ada konten untuk dipratinjau.</span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`flex justify-end gap-3 pt-4 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <Link
            to="/dashboard"
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition ${
              isDark 
                ? 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Ajukan Materi
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}