**03 - Controller**

sebelumnya kita sudah bisa membuat url yang kita tulis menjadi elemen-elemen pada arry:

     Contoh URL: localhost/phpmvc/public/home/index/123
        [
            0 => "home", // controller
            1 => "index", // method
            2 => "123" // parameter
        ]

jadi elemen-elemen ini akan dihubungkan ke controller/method/parameter untuk tiap-tiap halamannya 

dan juga bila menuliskan `localhost/phpmvc/public/` akan otomtis memanggil controller dan method default. Itu yang dilakukan dalam materi ini

**Algoritma App (Core)**
Class App bertugas membaca URL dan menjalankan controller, method, serta parameter yang sesuai.

__Algoritma utama:__
1. Ambil URL dari browser.
2. Pecah URL menjadi array menggunakan fungsi `parseURL()`.
3. Cek apakah elemen pertama (controller) ada di folder `controllers/`.
    - Jika ada → gunakan controller itu.
    - Jika tidak → tetap gunakan controller default (`Home`).
4. Setelah controller ditentukan, cek elemen kedua (method).
    - Jika method ada di controller → jalankan method itu.
    - Jika tidak → gunakan method default (`index`).
5. Sisa elemen array dianggap sebagai parameter dan dikirimkan ke method.
6. Jalankan controller, method, dan parameter menggunakan `call_user_func_array.`

---
**Algoritma Controller (Contoh)**
- Home Controller → menampilkan halaman default `home/index.`
- About Controller → memiliki dua method:
    - `index()` → bisa menerima parameter name dan pekerjaan.
    - `page()` → menampilkan halaman sederhana `about/page.`

---
**Base Controller**
Disediakan sebuah `Controller` (kelas induk kosong) di `folder core/.`
Tujuannya adalah agar semua controller bisa `extends` ke sini.
Nantinya di kelas induk ini kita bisa menambahkan fungsi-fungsi umum, seperti:
    - Memanggil model.
    - Memanggil view.
    - Membuat validasi standar.

**Ringkasan Alur**
1. User akses URL di browser.
2. .htaccess menulis ulang URL → index.php?url=....
3. index.php memanggil init.php.
4. init.php memanggil App.
5. App memproses URL → menentukan controller, method, dan parameter.
5. Controller dipanggil sesuai request user.
6. Method di dalam controller dijalankan, dan parameter dikirim jika ada.
7. Output ditampilkan ke browser.