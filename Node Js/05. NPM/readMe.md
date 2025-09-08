__Apa itu NPM?__

- NPM awalnya adalah singkatan dari Node Package Manager.
- Merupakan platform tempat developer Node.js menyimpan dan berbagi modul.
- Dibuat pada 2009 untuk mengelola proyek open-source.
- Tahun 2014, NPM didirikan sebagai perusahaan, lalu diakuisisi oleh GitHub dan sekarang berada di bawah Microsoft.
- NPM berfungsi sebagai manajer paket untuk Node.js.
- Saat menginstal Node.js, kita otomatis mendapatkan dua aplikasi:
    - Node.js itu sendiri
    - NPM (CLI) → sebagai jembatan antara komputer dan package manager.

Website resmi: `npmjs.com`

---
__Memulai Proyek NPM__
1. Arahkan terminal ke folder proyek.
2. Pastikan NPM sudah terinstal:

        npm -v

3. Inisialisasi proyek:

        npm init

4. Isi detail proyek (nama, versi, deskripsi, entry point, repository, author, license, dll).

5. Hasilnya, akan dibuat file:
    - package.json → deskripsi proyek & dependensi.

---
__Semantic Versioning__
NPM menggunakan format X.Y.Z:
- Z (patch): perbaikan bug (kompatibel dengan versi sebelumnya).
- Y (minor): fitur baru (tetap kompatibel).
- X (major): perubahan besar (tidak kompatibel dengan versi sebelumnya).

Contoh: `1.4.2`
- 1 = major
- 4 = minor
- 2 = patch

---
__Skrip NPM__
Di dalam package.json, kita bisa menambahkan skrip khusus.
- Menjalankan skrip test:

        npm run test

- Menjalankan skrip start:

        npm start

- Menjalankan skrip lain (misalnya `dev`):

        npm run dev

---
__Menginstal Paket__

- Instal paket:

        npm install <nama_paket>
        # atau
        npm i <nama_paket>

Contoh:

        npm i validator

- Hasil instalasi:
    - dependencies di package.json diperbarui.
    - Folder node_modules dibuat.
    - File package-lock.json ditambahkan.

- Instal versi tertentu:

        npm i <nama_paket>@<versi>

Contoh:

        npm i validator@13.5.2

Menghapus Paket

- Hapus paket:

        npm uninstall <nama_paket>

- Efeknya:
    - Dihapus dari dependencies di package.json.
    - Folder paket di node_modules hilang.
    - package-lock.json diperbarui.