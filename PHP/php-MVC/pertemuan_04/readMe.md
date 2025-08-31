**04 – View**

Sebelumnya, kita menuliskan output langsung di dalam controller, contohnya:

    echo "Halo, nama saya $name, saya seorang $pekerjaan!";

Cara ini tidak fleksibel karena mencampur logika dengan tampilan.
Solusinya: gunakan View → file khusus yang menyimpan antarmuka/tampilan.

---
**Konsep Dasar**
- Controller → hanya bertugas memanggil View.
- View → menyimpan tampilan (HTML, teks, dsb).
- __Controller.php (core)__ → menyediakan method view() untuk memanggil file yang ada di folder `views`.
Sehingga, controller cukup memanggil:

    $this->view('home/index');

maka sistem akan membuka file `views/home/index.php`

---
**Struktur View**
- Setiap controller punya folder view sendiri.
    - controllers/Home.php → view ada di views/home/
    - controllers/About.php → view ada di views/about/
Contoh:

    views/
    ├── home/
    │   └── index.php
    └── about/
        └── index.php

---
**Mengirim Data ke View**
Controller juga bisa mengirimkan data ke view.
- Data disiapkan dalam bentuk array asosiatif $data.
- Data ini kemudian dipakai di file view dengan menampilkan variabel tersebut.

Contoh alurnya:
1.  URL memanggil controller `About`.
2. Controller `About` menyiapkan data (misalnya: nama, pekerjaan).
3. Controller memanggil `$this->view('about/index', $data);`
4. File `views/about/index.php` akan menerima `$data` dan menampilkannya.

---
**Template (Header & Footer)**
Agar tampilan lebih konsisten, dibuat folder templates di dalam views.
- views/templates/header.php
- views/templates/footer.php

Kemudian di setiap view utama, kita tinggal memanggil header dan footer.

Manfaat:
- Tidak perlu menulis ulang struktur HTML yang sama di setiap halaman.
- Lebih mudah mengganti layout (cukup ubah header.php atau footer.php).

---
**Judul Halaman (Dynamic Title)**
Untuk membuat judul halaman dinamis:
- Tambahkan $data['judul'] di setiap controller.
- `$data['judul']` digunakan di `header.php sebagai <title>.`
- Dengan begitu, setiap halaman akan menampilkan judul yang sesuai dengan nama halamannya.

---
**Ringkasan Alur**
1. User akses URL.
2. Controller menentukan data & memanggil view.
3. `Controller.php (core)` memanggil file view sesuai request.
4. View menampilkan antarmuka + data yang dikirim dari controller.
5. Template (header & footer) menjaga konsistensi layout.
