__Menjalankan File Node.js__

Kalau kita bikin file JavaScript (misalnya app.js), kita bisa jalanin file itu lewat terminal/command prompt.
Caranya:
`node app.js`

Terminal yang dipakai bisa:
- Terminal bawaan di sistem (Command Prompt/Terminal).
- Terminal di dalam Visual Studio Code (lebih praktis).

Kalau nama filenya index.js, cukup jalankan:
`node .`
(titik artinya jalankan file utama index.js di folder itu).

---
__Perbedaan Browser vs Node.js__

- Browser punya objek global window. Semua variabel global bisa diakses lewat window.
- Node.js nggak punya window, tapi punya lingkungan sendiri.

Di Node.js:
- Setiap file dianggap modul yang terpisah.
- Jadi, variabel di satu file tidak otomatis bisa diakses di file lain (beda dengan browser, di mana semua file JS dalam satu halaman HTML bisa saling baca variabel global).

---

__Sistem Modul di Node.js__
Karena tiap file berdiri sendiri, Node.js pakai sistem modul supaya kita bisa berbagi kode antar file.

1. Ekspor (module.exports)
- Kita tentuin bagian mana dari file yang mau dibagikan keluar.
- Contoh di math.js:

        // math.js
        function tambah(a, b) {
        return a + b;
        }

        module.exports = tambah; // ekspor fungsi tambah    

2. Impor (require)
- Di file lain, kita bisa pakai require() buat ambil kode yang diekspor tadi.
- Contoh di app.js:

        // app.js
        const tambah = require('./math'); // impor fungsi tambah

        console.log(tambah(3, 4)); // output: 7

Intinya:
- Node.js jalanin file JS lewat terminal dengan node `namafile.js.`
- Browser dan Node.js punya lingkungan yang beda. Node.js anggap setiap file sebagai modul terpisah.
- Supaya file bisa saling berbagi kode, kita pakai module.exports (ekspor) dan require() (impor).
