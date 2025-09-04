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

