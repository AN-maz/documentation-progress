# Tugas Besar (UAS) Pemograman Web 1 

# Sistem Manajemen UKM English Club UTB

## Deskripsi Proyek

Proyek ini merupakan sebuah web application yang digunakan untuk mengelola sistem manajemen laporan UKM English Club UTB. Sistem ini mencakup pengelolaan data anggota, agenda kegiatan, serta rapat internal yang meliputi absensi. Selain itu, aplikasi ini juga menyediakan informasi terkait UKM English Club melalui halaman landing page.

Web application ini diharapkan dapat menjadi platform pendukung pembelajaran dan aktivitas organisasi UKM English Club UTB.

---

## Role Pengguna

Aplikasi ini memiliki dua peran utama, yaitu Admin dan User.

### Admin
Admin terbagi menjadi tiga kategori:
- Super Admin  
- Admin Education  
- Admin SDM  

### User
User terbagi menjadi tiga kategori:
- Pengurus  
- Anggota Aktif  
- Anggota Pasif  

---

## Struktur Landing Page

Landing page terbagi menjadi dua halaman utama:
- Home  
- About  

---

## Halaman Home

Halaman Home terdiri dari beberapa section utama, yaitu:

### Main Section
![home](images/home/home.png)
Berisi:
- Jargon dan logo Universitas UTB  
- Deskripsi singkat tentang UKM English Club  
- Tombol Join Now untuk calon anggota  
- Tombol Learn More untuk informasi lebih lanjut  

### News Section
![home](images/home/news.png)
Menampilkan berita dan kegiatan UKM English Club UTB yang dapat:
- Dibaca secara detail  
- Dicari berdasarkan kata kunci tertentu  

### Vision & Mission Section
Berisi visi dan misi UKM English Club UTB.
![home](images/home/visiMisi.png)

### Footer
![home](images/home/footer.png)
Berisi informasi:
- Hak cipta (Copyright)  
- Partnership  
- Membership  
- Kontak lanjutan melalui WhatsApp yang dikelola oleh Divisi SDM  
- Instagram EC-UTB

---

## Halaman About

Halaman About berisi informasi lanjutan dari halaman Home, yang terdiri dari:

### Our Journey
Menampilkan perjalanan dan sejarah UKM English Club.
![home](images/about/jorney.png)

### Board of Advisors
Memperkenalkan pembina UKM English Club UTB.
![home](images/about/pembina.png)

### Our Structure
![home](images/about/pengurus.png) 
Menampilkan struktur kepengurusan periode yang sedang berjalan, meliputi:
- Top Management  
- Setiap divisi yang ada di UKM English Club UTB 


---

## Login dan Register

Sistem menyediakan fitur login dan registrasi untuk pengguna.

### Halaman Login
![home](images/auth/login.png) 

### Halaman Register
![home](images/auth/register.png) 

Calon anggota yang ingin bergabung diwajibkan mengisi form registrasi. Setelah proses registrasi berhasil, sistem akan menampilkan notifikasi bahwa akun telah dibuat dan sedang menunggu proses approval dari Admin SDM atau Super Admin.

### Video Demo
[video demo]

---

## Dashboard Admin dan Hak Akses

Sistem memiliki pembagian hak akses dashboard berdasarkan peran admin, yaitu:

---

### 1. Super Admin

Super Admin memiliki akses penuh terhadap seluruh fitur sistem dengan menu sebagai berikut:

- **Dashboard**  
![home](images/dashboard/dashboard-super.png) 
  Menampilkan grafik data anggota, fitur export ke Excel dan PDF, serta rekap total berita, pengguna, dan pending approval.

- **News**  
![home](images/dashboard/news.png) 
  Mengelola berita acara yang ditampilkan pada landing page.

- **Account Users**  
![home](images/dashboard/account.png) 
  Mengelola akun pengguna, meliputi:
  - Edit data akun  
  - Approval akun  
  - Reset password  

- **Agenda**  
![home](images/dashboard/agenda.png) 
  Mengatur dan membuat agenda kegiatan bersama user, meliputi:
  - Input materi  
  - Sistem absensi  
  - Generate token absensi  
  - Export data absensi ke Excel  

- **Rapat Internal**  

  Manajemen rapat internal pengurus untuk diskusi organisasi, dilengkapi dengan fitur export absensi ke Excel.

- **Structure**  
![home](images/dashboard/structure.png) 
![home](images/dashboard/structure-2.png) 
  Manajemen struktur organisasi yang akan ditampilkan pada bagian Our Structure di halaman About.

---

### 2. Admin Education

Admin Education memiliki akses pada fitur akademik dan kegiatan, dengan menu sebagai berikut:

- **Dashboard**  
![home](images/dashboard/dashboard-edu.png) 
  Menampilkan jumlah agenda dan ringkasan agenda terbaru dalam format tabel.

- **Agenda**  
![home](images/dashboard/agenda-edu.png) 
  Mengatur dan membuat agenda kegiatan bersama user, meliputi:
  - Input materi  
  - Sistem absensi  
  - Generate token absensi  
  - Export data absensi ke Excel  

---

### 3. Admin SDM

Admin SDM berfokus pada pengelolaan anggota dan sumber daya manusia, dengan menu sebagai berikut:

- **Dashboard**  
![home](images/dashboard/dash-sdm.png) 
  Menampilkan grafik data anggota, fitur export ke Excel dan PDF, serta rekap total berita, pengguna, dan pending approval.

- **Account Users**  
![home](images/dashboard/acc-sdm.png) 
  Mengelola akun pengguna, meliputi:
  - Edit data akun  
  - Approval akun  
  - Reset password  

- **Rapat Internal**  
![home](images/dashboard/internal-sdm.png) 
  Manajemen rapat internal pengurus, dilengkapi dengan fitur export absensi ke Excel.

---

## Sistem Login dan Keamanan

Pada sistem login, web application ini menggunakan fitur **Remember Me** agar pengguna tidak perlu melakukan login ulang menggunakan username dan password setiap kali mengakses sistem.

Data sesi login disimpan dalam bentuk cookie yang telah di-hash dan disimpan ke dalam database untuk menjaga keamanan akun pengguna.


Sebelum login dengan remember me
![home](images/cookie/before.png)

sesudah login dengen remember me
![home](images/cookie/after.png)

Demo vidio



---
# Untuk hasil Export

- Excel
![home](images/export/excel.png)

- PDF
![home](images/export/pdf.png)

