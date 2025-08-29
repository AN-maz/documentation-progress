MVC - Database Wrapper

Database Wrapper adalah `lapisan abstraksi (abstraction layer) yang membungkus (wrap) fungsi-fungsi database sehingga kamu tidak langsung berhubungan dengan mysqli atau PDO.`

Langkah-langkah:
- membuat folder `config` dan file `config` dengan isi filenya data-data dari database yang berupa konstanta
- sekarang tidak butuh file `Constanta.php` di folder `Core`
- ubah di bagian `init.php` constantnya dengan mengarah ke `config/Config.php`
- Kemudian buat file `Database` di folder `core` ?
- kode program yang di file `mahasiswa_model` untuk database dipindahkan ke `Database`
- Setelah diisi dibagian `Database.php` jangan lupa untuk dipanggil di `init.php`nya

