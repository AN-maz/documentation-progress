**Model Factories**

Membuat data dummy dengan mengunakan Factory

Mencoba membuat di Table User: `App\Models\User::factory(100)->create();`
akan membuat 100 data dummy

Sekarang mengimplementasi ke Post. 
Fokus Ke folder `Models` dan `Database/factories`

Hapuskan file post dulu dan buat baru di tinker: 
`php artisan make:factory`
`Post`

Lalu di dalam File itu, buatkan format untuk template data dummynya **baca kode di file itu**

---

**Eloquent Relationship**

Membuat relasi dari table `users` ke `posts` 
dengan kardinalitas `author` MEMILIKI `blog` banyak (one to Many) 

Modifikasi File:
- 2025_09_04_023845_create_posts_table
Tujuannya: mengubah author menjadi foreign key untuk `id` di table `users`

-  `Post.php`
Menambahkan fungsi untuk memberitahu table `post` berelasi ke table lain (user)

- `User.php`
Menambahkan fungsi untuk memberitahu hubungan dari user ke post (one-to-many).

Jadi singkatnya:
- `author()` di Post = hubungan dari post ke user (many-to-one).
- `posts()` di User = hubungan dari user ke post (one-to-many).

- `Web.php`
Menambahkan rute baru yang dimana untuk memfilter posts dari satu penulis

- `PostFactory.php`
mengubah baris `author` menjadi `author_id`. Jadi pada saat menambahkan data dummy sudah saling berelasi

- Menyesuaikan `View`
Karena Page `Artikles By` memanipulasi dari page `blog`
Dilakukan menyesuaian 


