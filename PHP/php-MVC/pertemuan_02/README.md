02-Routing

Routing bertugas mengelola URL agar lebih rapi dan mudah dipahami.
Tujuan utamanya adalah membuat Pretty URL, misalnya:

    Tanpa routing: localhost/phpmvc/public/index.php?url=home/index
    Dengan routing: localhost/phpmvc/public/home/index

__Cara Kerja Routing__

1.  URL Utama → localhost/phpmvc/public
    - Jika tidak ada tambahan setelah URL utama, aplikasi otomatis akan memanggil controller default (misalnya Home) dan method default (misalnya index).
2.  Jika ada tambahan URL → misalnya localhost/phpmvc/public/about
    - Maka sistem akan mencari controller bernama About.
    - Jika ada, method default (index) akan dijalankan.
    - Jika tidak ada, maka sistem akan kembali ke controller/method default.
3.  Parsing URL - Di dalam App.php (folder core), kita buat fungsi parseURL() untuk memecah string URL menjadi array. - Array ini akan digunakan untuk menentukan controller, method, dan parameter.

        Contoh URL: localhost/phpmvc/public/home/index/123

        Akan diparsing menjadi:
        [
            0 => "home", // controller
            1 => "index", // method
            2 => "123" // parameter
        ]

Konfigurasi .htaccess
Agar URL kita terlihat rapi (menyembunyikan index.php?url=), kita gunakan file .htaccess.
Di folder public/ buat file .htaccess dengan isi berikut:

    Options -MultiViews
    RewriteEngine On 
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f 
    RewriteRule ^(.*)$ index.php?url=$1 [L]

Fungsinya:
- RewriteEngine On → mengaktifkan fitur rewrite.
- RewriteCond → memastikan hanya file/direktori yang tidak ada yang akan diproses.
- RewriteRule → menulis ulang URL agar index.php?url=... berubah jadi .../....

Di folder app/ buat juga .htaccess dengan isi: 

    Options -Indexes

Fungsinya untuk memblok akses langsung ke folder app/ agar tidak bisa diakses user lewat browser.

---__Alur Routing__---
1. User akses localhost/phpmvc/public/home/index.
2. .htaccess mengubah URL menjadi index.php?url=home/index.
3. index.php memanggil init.php.
4. init.php menjalankan App.php.
5. App.php → parseURL() memecah string home/index.
6. Controller Home dijalankan, lalu method index dipanggil.

---__Ringkasan__---
- Routing membuat URL lebih rapi, singkat, dan mudah dibaca.
- .htaccess digunakan untuk menyembunyikan query string.
- Fungsi parseURL() bertugas memecah URL menjadi bagian-bagian penting:
    - controller
    - method
    - parameter (opsional)
Dengan konsep ini, aplikasi kita lebih profesional dan gampang dikembangkan.