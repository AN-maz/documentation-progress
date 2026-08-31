### Pemetaan Endpoint vs Menu Admin

| Menu Frontend | Fitur / Kebutuhan | Status Coverage Endpoint Backend |
| --- | --- | --- |
| **1. Admin Dashboard Overview** (`/admin`) | Ringkasan statistik (Total User, Total Materi Pending, Total Materi Approved, Total Interaksi) | **Belum Tercover** (Belum ada `GET /api/v1/admin/stats` atau sejenisnya). |
| **2. Daftar Moderasi** (`/admin/moderation`) | Menampilkan daftar materi berstatus `PENDING` | **Sudah Tercover** via `GET /api/v1/admin/materials`. |
| **3. Review Detail Materi** (`/admin/moderation/:id`) | - Preview isi detail materi<br>

<br>- Aksi Approve / Reject materi | - Preview: **Sudah Tercover** via `GET /api/v1/materials/:slug`.<br>

<br>- Aksi: **Sudah Tercover** via `PATCH /api/v1/admin/materials/:id/status`. |
| **4. Kelola Kategori** (`/admin/categories`) | - Lihat daftar kategori<br>

<br>- Tambah, Edit, Hapus kategori | - Lihat: **Sudah Tercover** via `GET /api/v1/categories`.<br>

<br>- Tambah/Edit/Hapus: **Belum Tercover** (Belum ada `POST`, `PUT`, `DELETE` untuk `/categories` dengan *role admin*). |

---

### Rincian Endpoint Backend yang Belum Tercover

Jika kita ingin **semua menu admin berfungsi penuh (Full MVP)**, backend perlu menambahkan beberapa endpoint berikut:

#### **A. Untuk Menu Admin Dashboard Overview (`/admin`)**

* `GET /api/v1/admin/stats` *(Perlu Dibuat)*
* **Fungsi:** Mengembalikan data agregat ringkas seperti jumlah user, jumlah materi pending, materi terbit, dan total penyelesaian materi.



#### **B. Untuk Menu Kelola Kategori (`/admin/categories`)**

* `POST /api/v1/admin/categories` *(Perlu Dibuat)*
* **Fungsi:** Menambah kategori baru (perlu `authMiddleware` & `roleMiddleware('admin')`).


* `PUT /api/v1/admin/categories/:id` *(Perlu Dibuat)*
* **Fungsi:** Mengubah nama/slug kategori.


* `DELETE /api/v1/admin/categories/:id` *(Perlu Dibuat)*
* **Fungsi:** Menghapus kategori.



---

### Rekomendasi Langkah Kerja saat Ini

Untuk menjaga ritme pengembangan, ada 2 opsi pendekatan yang bisa diambil:

1. **Fokus ke Modul Moderasi Dulu (Tanpa Sentuh Backend):**
* Buat halaman **Daftar Moderasi** (`/admin/moderation`) dan **Review Detail** (`/admin/moderation/:id`).
* Kedua halaman ini **100% siap diintegrasikan** dengan endpoint yang sudah ada saat ini (`GET /admin/materials` dan `PATCH /admin/materials/:id/status`).


2. **Lengkapi Endpoint Backend Admin Dulu:**
* Tambahkan endpoint CRUD Kategori (`POST`, `PUT`, `DELETE` `/admin/categories`) dan Stats (`GET /admin/stats`) di backend terlebih dahulu agar saat buat frontend admin, seluruh 4 menu bisa langsung di-Integrasikan penuh.