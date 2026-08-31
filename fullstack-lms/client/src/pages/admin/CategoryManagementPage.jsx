import { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { adminService } from '../../api/admin.service';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
} from 'lucide-react';

export default function CategoryManagementPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const res = await adminService.getCategories();

        if (cancelled) return;

        const list = res?.data?.data || res?.data || res || [];

        setCategories(Array.isArray(list) ? list : []);
      } catch (err) {
        if (!cancelled) {
          console.error('Gagal mengambil daftar kategori:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshCategories = async () => {
    try {
      const res = await adminService.getCategories();

      const list = res?.data?.data || res?.data || res || [];

      setCategories(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Gagal mengambil daftar kategori:', err);
    }
  };

  const handleOpenModal = (category = null) => {
    setEditTarget(category);
    setCategoryName(category ? category.name : '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTarget(null);
    setCategoryName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    try {
      setSubmitting(true);

      if (editTarget) {
        await adminService.updateCategory(
          editTarget.id,
          categoryName.trim()
        );
      } else {
        await adminService.createCategory(
          categoryName.trim()
        );
      }

      handleCloseModal();

      await refreshCategories();
    } catch (err) {
      alert(
        'Gagal menyimpan kategori: ' +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus kategori "${name}"?`
    );

    if (!confirmed) return;

    try {
      await adminService.deleteCategory(id);

      await refreshCategories();
    } catch (err) {
      alert(
        'Gagal menghapus kategori: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-500" />
            Kelola Kategori Materi
          </h1>

          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Tambah, ubah, atau hapus kategori untuk
            mengelompokkan materi.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </button>
      </div>

      {/* Filter Bar */}
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Cari kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-9 pr-4 py-2 text-sm rounded-xl border outline-none transition ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-indigo-500'
              : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500'
          }`}
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />

          <p className="text-sm">
            Memuat data kategori...
          </p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div
          className={`p-12 text-center rounded-2xl border ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-400'
              : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <p className="font-semibold text-base">
            Kategori tidak ditemukan
          </p>
        </div>
      ) : (
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead
              className={`border-b text-xs uppercase font-semibold ${
                isDark
                  ? 'border-slate-800 bg-slate-950/50 text-slate-400'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <tr>
                <th className="py-3.5 px-4 w-16">
                  #
                </th>

                <th className="py-3.5 px-4">
                  Nama Kategori
                </th>

                <th className="py-3.5 px-4 text-right">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark
                  ? 'divide-slate-800'
                  : 'divide-slate-100'
              }`}
            >
              {filteredCategories.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className={`transition ${
                    isDark
                      ? 'hover:bg-slate-800/40'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 text-xs text-slate-400">
                    {idx + 1}
                  </td>

                  <td className="py-3.5 px-4 font-semibold">
                    {cat.name}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleOpenModal(cat)
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 transition"
                        aria-label={`Edit kategori ${cat.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            cat.id,
                            cat.name
                          )
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
                        aria-label={`Hapus kategori ${cat.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {editTarget
                  ? 'Edit Kategori'
                  : 'Tambah Kategori Baru'}
              </h3>

              <button
                type="button"
                onClick={handleCloseModal}
                className={`text-slate-400 ${
                  isDark
                    ? 'hover:text-white'
                    : 'hover:text-slate-700'
                }`}
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-400">
                  Nama Kategori
                </label>

                <input
                  type="text"
                  required
                  placeholder="Contoh: Web Development"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                  className={`w-full p-3 text-sm rounded-xl border outline-none transition ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border disabled:opacity-50 ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-800'
                      : 'border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    !categoryName.trim()
                  }
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? 'Menyimpan...'
                    : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
