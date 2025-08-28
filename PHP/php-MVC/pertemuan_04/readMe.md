Membahas Tentang View

untuk mengakses web tersebut , ketikan:
http://localhost/phpmvc/pertemuan_04/public/

defaultnya akan mengarah ke home/index

lengkapnya bisa:
http://localhost/phpmvc/pertemuan_04/public/about/index/Purwa/Muslim

maka akan menampilkan: 
`Halo! nama saya purwa, sy seorang muslim Lho!`

tetapi ada kondisi default bilamana method/paramaternya ga ada. Dicoba aja

--- View ---
Dipertemuan ini. Kita akan mengganti isi tiap-tiap mehthod dengan view

di folder `views` ada subFolder `about` dan `home` untuk menampilkan web
mereka dikontrol oleh `controllers` yang berisi file sesuai dengan `views` yang ada
di tiap file yang ada di `controllers` mewarisi dari class file`controller` di folder `core`
disana ada method `view()` berisi parameter data file view .php dan data untuk isi parameternya dengan array

---
folder `templates` berisi header dan footer yang akan digunakan di semua `views`
ini merupakan template biar memudahkan pada saat styling nantinya
sudah include dengan fitur otomatis nama header sesuai dengan file view/konten web yang diarah
