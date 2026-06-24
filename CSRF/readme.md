### 1. Persiapan *Backend* (Web Target / Sistem Asli)

Buat *backend* sederhana menggunakan Express.js. Web ini ibarat sistem bank atau sistem akademik kampus.

* **Database:** Gunakan *native* SQL *query* langsung untuk eksekusi perintahnya (misalnya `UPDATE users SET password = ?` atau `INSERT INTO transfer...`), tidak perlu repot melakukan *setup* ORM untuk simulasi singkat ini.
* **Endpoint Rentan:** Buat sebuah *route* (misal `POST /ubah-password` atau `POST /transfer-saldo`) yang bertugas memproses data. **Kunci kerentanannya:** Biarkan *endpoint* ini hanya mengecek keberadaan *session cookie* tanpa meminta token validasi tambahan (CSRF Token).
* **Pengaturan Cookie:** Agar simulasinya berjalan lancar di *browser* modern saat tahap *testing*, pastikan konfigurasi *cookie session* di *backend*-mu **tidak** di-set menggunakan `SameSite=Strict`.

### 2. Persiapan *Frontend* (Web Target / Sistem Asli)

Gunakan React atau HTML biasa dengan Tailwind CSS untuk membuat dua halaman simpel:

* **Halaman Login:** Untuk korban masuk ke dalam sistem.
* **Halaman Dashboard:** Menampilkan informasi penting, misalnya "Saldo Anda: Rp 1.000.000" atau "Status Akun: Aktif".

### 3. Persiapan Web Jebakan (Situs Milik Hacker)

Ini bagian paling seru. Kamu hanya perlu membuat satu *file* HTML murni (`hacker.html`), tidak perlu *database* atau *backend* sama sekali!

* **Tampilan Penipu:** Buat UI yang menjebak, misalnya tombol besar bertuliskan "Klaim Hadiah Rp 500.000!" atau sekadar menampilkan gambar meme kucing lucu.
* **Form Tersembunyi (Payload):** Di balik tombol tersebut, buat sebuah `<form>` HTML yang secara rahasia mengarah (*action*) ke *endpoint* web aslimu (`http://localhost/transfer-saldo`).
* **Auto-Submit (Opsional):** Kamu bahkan bisa menggunakan sedikit JavaScript agar saat halaman `hacker.html` dibuka, *form* tersebut otomatis terkirim tanpa korban harus mengklik apa pun!

---

### Skenario *Recording* Video (Untuk Durasi 1 Menit)

Karena durasi video minimal 1 menit, kamu bisa merekam dengan alur *screencast* yang cepat dan padat:

1. **Scene 1 (Aman):** Tunjukkan layar saat kamu (sebagai korban) sedang *login* di sistem kampus/bank, dan perlihatkan bahwa saldo/datamu masih aman.
2. **Scene 2 (Jebakan):** Ceritakan bahwa korban tiba-tiba mendapat pesan WhatsApp berisi *link* aneh. Buka *tab* baru di *browser* yang sama dan jalankan `hacker.html`.
3. **Scene 3 (Eksekusi):** Korban mengklik tombol "Klaim Hadiah" di web jebakan tersebut.
4. **Scene 4 (Dampak Fatal):** Kembali ke *tab* sistem asli, lalu *refresh* halaman *dashboard*. Perlihatkan bahwa tiba-tiba saldomu habis atau datamu berubah, padahal kamu tidak pernah mengklik tombol transfer di sistem asli!

Pesan edukasinya sangat kuat: **Jangan sembarangan mengklik tautan dari orang tidak dikenal, terutama saat kamu sedang dalam kondisi *login* di aplikasi keuangan atau data penting lainnya.**

Untuk *endpoint* rentan yang akan diserang nanti, kamu lebih tertarik membuat simulasi sistem "Transfer Saldo Uang" atau "Ubah Password Akun Mahasiswa"?