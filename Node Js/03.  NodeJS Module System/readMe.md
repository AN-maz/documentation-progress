__Sistem Modul di Node.js__

Materi ini membahas konsep modul di Node.js, yaitu bagaimana setiap file JavaScript dianggap sebagai modul terpisah yang bisa diekspor dan diimpor untuk digunakan kembali. Konsep ini penting untuk membuat aplikasi yang terstruktur dan mudah dikelola.

---
__Konsep Dasar Modul__

- Apa itu Modul?
Modul adalah sekumpulan kode yang dapat digunakan kembali.
Di Node.js, modul ditulis dalam file JavaScript, lalu dibagikan menggunakan:
    - `module.exports` → untuk mengekspor
    - `require()` → untuk mengimpor

---
__Jenis Modul di Node.js__

1. Core Module → Modul bawaan Node.js.
Contoh: `fs` (file system), `http` (jaringan).
2. Local Module → Modul buatan kita sendiri (fokus utama pembelajaran).
3. Third-Party Module → Modul dari orang lain yang diinstal lewat NPM.

---
__Cara Kerja require dan module.exports__

- `require()` → Digunakan untuk mengimpor modul. Urutan pencarian:
1.Core Module
2. Local Module `(./` atau `../)`
3. Third-Party Module (node_modules)
- `module.exports` → Menentukan apa yang bisa diakses dari luar modul (fungsi, variabel, objek, kelas, dll).