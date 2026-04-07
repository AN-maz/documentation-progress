# Panduan Modul Portofolio Sederhana - Pertemuan 01

Jadi di panduan ini bakal ngebantu temen-temen buat memahami dan memodifikasi kode HTML ataupun CSSnya yang sudah disediain. Dicoba-coba dulu aja ga perlu takut error selama udh ngebaca panduannya.

---

## Mengenal File projectnya:

Dalam folder proyek ini, terdapat tiga file utama:

- `index.html`: Ini adalah halaman utama (Beranda) website kamu. Ibarat sebuah rumah, ini adalah ruang tamunya.

- `contact.html`: Ini adalah halaman berisi formulir agar orang lain bisa menghubungi kamu (tapi masih belum jalan secara fungsi ya).

- `style.css`: Ini adalah file "makeup" atau dekorasi. Fungsinya untuk mengatur warna, jarak, dan tata letak agar HTML yang tadinya kaku menjadi cantik.

---

## Langkah 1: Mengubah Data Diri (HTML)

Mari kita buka file `index.html` dan ubah teks bawaan menjadi data dirimu. Cari tanda kurung siku seperti `[nama]` atau` [...]` dan ganti isinya.

Sebagai contoh, jika namamu adalah Purwa:

<title>Portpolio - Purwa</title>
<span>Purwa</span>


### Menambah Paragraf dan Deskripsi

Di dalam tag <main>, terdapat tag <p> (Paragraf). Kamu bisa mengganti teks (isi sendiri) dengan perkenalan dirimu.

<h1>Welcome!</h1>
<p>Halo! Saya Purwa, seorang mahasiswa UTB yang sedang antusias belajar web development di oxigen.</p>

Tips: Jika ingin membuat baris baru atau paragraf baru, cukup tambahkan tag <p>Teks baru di sini</p> lagi di bawahnya.

### Langkah 2: Menambah Konten (HTML)

1. Menambah List "Skill"

Website ini menggunakan Unordered List (<ul>) untuk mendaftar keahlian. Setiap poin keahlian dibungkus dengan List Item (<li>). Jika kamu ingin menambah skill baru (misalnya "React" atau "PHP"), cukup copy-paste baris <li> di dalam <ul>:

<h3>Skill</h3>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>React</li>
    <li>Figma</li>
</ul>

2. Menambah Baris pada Tabel

Tabel disusun oleh baris atau Table Row (<tr>). Di dalam baris tersebut ada Table Data (<td>). Untuk menambah data pengalaman atau pendidikan, kamu tinggal menyalin satu blok <tr> ke bawahnya.

<table border="1px">
    <tr>
        <th>Nama</th>
        <th>Profesi</th>
    </tr>
    <tr>
        <td>Purwa</td>
        <td>Web Developer</td>
    </tr>
    <tr>
        <td>adrian</td>
        <td>UI/UX Designer</td>
    </tr>
</table>

--- 

### Langkah 3: Mengustomisasi Tampilan (CSS)

Sekarang, mari kita buka file `style.css`. Kamu bisa mengubah nuansa website hanya dengan mengganti kode warna hex (seperti #333 atau #007bff).

Kamu bisa mencari kode warna hex sesuai seleramu di Google dengan kata kunci "Color Picker".

1. Mengubah Warna Tombol (Button)
Cari bagian button di file CSS. Secara bawaan warnanya adalah biru (#007bff).

    button {
    padding: 12px;
    background-color: #007bff; /* GANTI WARNA DI SINI */
    color: white; /* Ini warna teks di dalam tombol */
    /* ... kode lainnya ... */
    }

2. Mengubah Warna Header & Footer
Bagian atas (navigasi) dan bagian bawah (kredit) website juga bisa diubah warnanya.

- Cari bagian header untuk mengubah latar navigasi atas.
- Cari bagian footer untuk mengubah latar bagian bawah. Saat ini warnanya biru dongker gelap (#2c3e50).

    footer {
    background-color: #2c3e50; /* Coba ganti dengan #111 untuk warna hitam pekat */
    color: white;
    padding: 2rem 10%;
    text-align: center;
    }

3. Mengubah Tampilan Gambar Profil

Di file CSS bagian img, kamu bisa melihat kode ini:

    img {
    border-radius: 50%; /* Ini yang membuat fotomu menjadi bulat */
    border: 3px solid #fff; /* Ini adalah garis pinggir (bingkai) fotomu */
    }


Jika kamu ingin fotonya berbentuk kotak dengan sudut sedikit melengkung, ubah border-radius: 50%; menjadi border-radius: 10px;.


---

Selamat Bermekanik! 
Jangan takut untuk mengubah angka-angka dan warna di dalam file CSS atau menambah teks di HTML. Cara terbaik untuk belajar memprogram web adalah dengan mencoba dan melihat langsung hasilnya