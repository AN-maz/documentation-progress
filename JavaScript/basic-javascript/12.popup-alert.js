/*
========================================
POPUP DI JAVASCRIPT
========================================

JavaScript menyediakan 3 jenis popup dasar:
1. alert()   -> menampilkan pesan
2. confirm() -> pilihan OK / Cancel
3. prompt()  -> input dari user

Popup ini bersifat "blocking",
artinya kode akan berhenti sementara
sampai user memberikan respon.
*/

/*
========================================
ALERT
========================================

Digunakan untuk menampilkan pesan sederhana.
Hanya memiliki tombol "OK".
*/

// Sintaks dasar
alert("Ini adalah pesan alert");

// Contoh penggunaan
let nama = "Budi";
alert("Halo " + nama + ", selamat datang!");

/*
========================================
CONFIRM
========================================

Digunakan untuk meminta konfirmasi dari user.
Memiliki 2 tombol:
- OK     -> menghasilkan nilai true
- Cancel -> menghasilkan nilai false
*/

// Sintaks dasar
let hasil = confirm("Apakah kamu yakin?");

// Contoh penggunaan
let konfirmasi = confirm("Apakah kamu ingin menghapus data?");

if (konfirmasi) {
    alert("Data berhasil dihapus");
} else {
    alert("Penghapusan dibatalkan");
}


/*
========================================
PROMPT
========================================

Digunakan untuk meminta input dari user.
User dapat mengetikkan sesuatu.

Nilai yang dikembalikan:
- String (jika user mengisi)
- null (jika user menekan Cancel)
*/

// Sintaks dasar
let nama2 = prompt("Masukkan nama kamu:");

// Contoh penggunaan
let umur = prompt("Masukkan umur kamu:");

if (umur !== null) {
    alert("Umur kamu adalah " + umur);
} else {
    alert("User membatalkan input");
}

/*
Contoh alur interaksi sederhana dengan user
*/

let namaUser = prompt("Masukkan nama kamu:");

if (namaUser !== null) {
    let lanjut = confirm("Halo " + namaUser + ", lanjutkan?");

    if (lanjut) {
        alert("Selamat datang di aplikasi!");
    } else {
        alert("Kamu membatalkan masuk");
    }
} else {
    alert("Input dibatalkan");
}

/*
KELEBIHAN:
- Mudah digunakan
- Cocok untuk pembelajaran dasar

KEKURANGAN:
- Tampilan default browser (tidak bisa dikustom)
- Mengganggu UX karena blocking

Di project modern biasanya diganti dengan:
- Custom modal (HTML + CSS + JS)
- Library seperti SweetAlert
*/