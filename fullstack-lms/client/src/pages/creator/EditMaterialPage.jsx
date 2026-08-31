import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { materialService } from '../../api/materi.service';
import { useThemeStore } from '../../store/useThemeStore';
import { 
  ArrowLeft, 
  Loader2, 
  Save, 
  AlertCircle, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

export default function EditMaterialPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [categories, setCategories] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    cover_image_url: '',
    content: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingFetch(true);
        setError(null);

        const [catRes, userMatRes] = await Promise.all([
          materialService.getCategories(),
          materialService.getUserMaterials()
        ]);

        if (catRes.success || Array.isArray(catRes.data)) {
          setCategories(catRes.data || catRes);
        }

        if (userMatRes.success && userMatRes.data) {
          const materialsList = Array.isArray(userMatRes.data)
            ? userMatRes.data
            : userMatRes.data.materials || [];

          const target = materialsList.find((item) => String(item.id) === String(id));

          if (target) {
            setFormData({
              title: target.title || '',
              category_id: target.category_id || (target.category ? target.category.id : ''),
              cover_image_url: target.cover_image_url || '',
              content: target.content || ''
            });
          } else {
            setError('Materi tidak ditemukan atau kamu tidak memiliki hak akses.');
          }
        }
      } catch (err) {
        console.error('Error fetching material detail for edit:', err);
        setError('Gagal memuat data materi.');
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category_id || !formData.content) {
      alert('Judul, Kategori, dan Konten wajib diisi!');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        title: formData.title,
        category_id: parseInt(formData.category_id),
        cover_image_url: formData.cover_image_url,
        content: formData.content
      };

      await materialService.updateMaterial(id, payload);

      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error updating material:', err);
      setError(err.response?.data?.message || 'Gagal memperbarui materi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/materi/my-materials');
  };

  if (loadingFetch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Memuat data materi...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/materi/my-materials"
          className={`p-2.5 rounded-xl border transition ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            Edit Materi
          </h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Perbarui konten atau informasi materi pembelajaran kamu.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-6 rounded-2xl border space-y-5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Judul Materi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Pengenalan React JS untuk Pemula"
              required
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 text-slate-100 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Kategori <span className="text-rose-500">*</span>
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-100' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              URL Cover Gambar (Opsional)
            </label>
            <div className="relative">
              <input
                type="url"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-slate-100 placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {formData.cover_image_url && (
            <div className="mt-2 relative rounded-xl overflow-hidden h-48 bg-slate-800 border border-slate-700">
              <img
                src={formData.cover_image_url}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div>
            <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Konten Pembelajaran <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              placeholder="Tuliskan materi dalam format Teks / Markdown..."
              required
              className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 text-slate-100 placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/dashboard/materi/my-materials"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>

      {/* POPUP SUKSES EDIT */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-sm p-6 rounded-2xl border shadow-2xl text-center space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold">Materi Diperbarui!</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Perubahan pada materi pembelajaran kamu berhasil disimpan.
              </p>
            </div>
            <button
              onClick={handleCloseSuccess}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
            >
              Lihat Materi Saya
            </button>
          </div>
        </div>
      )}

    </div>
  );
}