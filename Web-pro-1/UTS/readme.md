## Preview Aplikasi

## Project-01

### 1. Halaman Utama (Landing Page)
Halaman depan yang dapat diakses oleh publik untuk melihat informasi perusahaan.

![Landing Page 1](imgs/readMe/index_1.png)
![Landing Page 2](imgs/readMe/index_2.png)

---

### 2. Autentikasi (Login & Register)
Fitur keamanan untuk admin atau user masuk ke dalam sistem.

| Halaman Login | Halaman Register |
| :---: | :---: |
| ![Login](imgs/readMe/login.png) | ![Register](imgs/readMe/register.png) |

---

### 3. Dashboard Admin
Pusat kontrol untuk mengelola data dan melihat statistik.

**Beranda Dashboard**
Menampilkan ringkasan statistik dan aktivitas terbaru.
![Dashboard Home](imgs/readMe/dashboard_home.png)

**Manajemen Profil**
Halaman untuk melihat informasi akun yang sedang login.
![Dashboard Profile](imgs/readMe/dashboard_profile.png)

**Manajemen dashboard_dataManagement**
Halaman untuk melihat informasi akun yang sedang login.
![Dashboard Profile](imgs/readMe/dashboard_dataManagement.png)

**Pengaturan (Settings)**
Halaman konfigurasi aplikasi.
![Dashboard Settings](imgs/readMe/dashboard_settings.png)


---

## Project-02

## Dokumentasi Pengujian API (Bruno)

Berikut adalah hasil uji coba (Testing) setiap endpoint API yang telah dibuat.

### 1. Autentikasi User
Pengujian fitur pendaftaran dan login user untuk mendapatkan akses.

| **Register User** | **Login User** |
| :---: | :---: |
| ![Register](imgs/project-2/register.png) | ![Login](imgs/project-2/login.png) |

---

### 2. Create Data (Upload Gambar)
Pengujian endpoint `create.php` menggunakan method **POST** dengan tipe body **Multipart Form**.

| **Request (Bruno)** | **Response Sukses / Database** |
| :---: | :---: |
| ![Create Request](imgs/project-2/createPost.png) | ![Create Response](imgs/project-2/createPost2.png) |

---

### 3. Read Data
Pengujian endpoint `read.php` menggunakan method **GET** untuk mengambil seluruh data.

**Menampilkan Data JSON:**
![Read Data](imgs/project-2/readPost.png)

---

### 4. Update Data
Pengujian endpoint `update.php` untuk mengedit data. Mendukung penggantian gambar lama dengan yang baru.

| **Request Update (Multipart)** | **Response Sukses** |
| :---: | :---: |
| ![Update Request](imgs/project-2/updatePost.png) | ![Update Response](imgs/project-2/updatePost2.png) |

---

### 5. Delete Data
Pengujian endpoint `delete.php` untuk menghapus data dari database.

| **Request Delete** | **Response Sukses** |
| :---: | :---: |
| ![Delete Request](imgs/project-2/deletePost.png) | ![Delete Response](imgs/project-2/deletePost2.png) |

---