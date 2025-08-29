MVC – Model

Model dalam PHP (MVC) adalah `bagian yang berhubungan langsung dengan database dan logika data.`
Model bertugas menyiapkan, mengambil, dan mengolah data, lalu mengembalikannya ke Controller untuk ditampilkan oleh View.

Pada pertemuan ini,menambahkan file dan kode program untuk menghubungkan data dari database ke Web App.

Langkah-langkah:
- Tambahkan menu `Mahasiswa di navbar`.
- Di folder `views`, buat `folder baru mahasiswa`.
- Di folder `models`, tambahkan file:
    - `Mahasiswa_model` → sebagai `jembatan antara database dan controller`, supaya logika query tetap rapi di models dan tidak bercampur di controller.
    - `user_model` → sebagai `contoh model sederhana untuk halaman home/index`.
- Di `folder controllers`, tambahkan `file Mahasiswa.php`:
    - `Menghubungkan Model (Mahasiswa_model)` yang berisi query database.
    - `Menghubungkan View (mahasiswa/index.php)` yang berisi tampilan HTML.

Intinya
Controller `Mahasiswa` berfungsi mengatur logika:
Jika user membuka halaman mahasiswa, data apa yang diambil dari database, dan view mana yang harus ditampilkan.

ALUR MVC:

            User (Browser)
                    │
                    ▼
            Request URL
                    │
                    ▼
            Controller
                    │
            ┌──────┴────────┐
            │               │
            ▼               ▼
        Model           View
        (Logika DB)     (Tampilan)
            │               ▲
            ▼               │
        Database   <── data ┘
