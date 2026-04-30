# Modul Pembelajaran: JavaScript Fundamental (JS Basics)

## 1. Variabel dan Tipe Data (Menyimpan Informasi)

### Konsep:
Dalam pemrograman, kita butuh tempat untuk menyimpan data (seperti nama, umur, atau skor). Tempat penyimpanan ini disebut Variabel. Layaknya sebuah kotak berlabel, kita bisa memasukkan barang ke dalamnya dan memanggilnya kapan saja menggunakan nama label tersebut.

### Tipe Data Utama:

- String: Teks (harus diapit tanda kutip "..." atau '...').
- Number: Angka (bisa dihitung dengan matematika, tanpa tanda kutip).
- Boolean: Hanya memiliki dua nilai, yaitu true (benar) atau false (salah).

### Kode & Contoh Penggunaan:

    // Membuat variabel menggunakan 'let' (nilainya bisa diubah nanti)
    let namaPeserta = "Andrian"; // String
    let umur = 20; // Number
    let sudahLulus = false; // Boolean

    // Mencetak hasilnya ke console browser
    console.log(namaPeserta);
    console.log("Umur peserta adalah: " + umur);

## 2. Operator Dasar (Matematika & Logika)

### Konsep:
Operator adalah simbol yang menyuruh JavaScript melakukan suatu aksi terhadap nilai atau variabel.
- Matematika: `+` (tambah), `-` (kurang), `*` (kali), `/` (bagi).
- Perbandingan: Mengecek nilai dan selalu menghasilkan Boolean (true/false). Contoh: `>` (lebih besar), `<` (lebih kecil),` === `(sama persis).
- Logika: Menggabungkan dua kondisi. `&&` (DAN - keduanya harus benar), `||` (ATAU - salah satu benar sudah cukup).

### Kode & Contoh Penggunaan:

    let nilaiUjian = 85;
    let batasLulus = 75;

    // Perbandingan
    let apakahLulus = nilaiUjian > batasLulus; 
    console.log(apakahLulus); // Output: true

    // Logika (Apakah nilai di atas 75 DAN umurnya di atas 18?)
    let syaratLengkap = (nilaiUjian > 75) && (umur > 18);

## 3. Percabangan / If-Else (Membuat Keputusan)

### Konsep:
Kode kita tidak harus berjalan lurus dari atas ke bawah. Dengan if-else, program bisa mengambil jalur berbeda tergantung dari situasi yang sedang terjadi (kondisi).

### Kode & Contoh Penggunaan:

    let jam = 14;

    if (jam < 12) {
        console.log("Selamat Pagi!"); // Berjalan jika jam di bawah 12
    } else if (jam < 18) {
        console.log("Selamat Siang!"); // Berjalan jika jam di antara 12 dan 18
    } else {
        console.log("Selamat Malam!"); // Berjalan jika semua kondisi di atas salah
    }

## 4. Perulangan / Loops (Mencegah Ketik Ulang)

### Konsep:
Bayangkan kamu harus mencetak kata "Halo" sebanyak 100 kali. Menulis console.log("Halo") 100 baris tentu sangat melelahkan. Loops memungkinkan kita menjalankan satu blok kode berkali-kali secara otomatis sampai kondisi tertentu terpenuhi.

### Kode & Contoh Penggunaan (For Loop):

// Aturan: (nilai awal; kondisi berhenti; penambahan setiap putaran)
for (let i = 1; i <= 5; i++) {
    console.log("Ini putaran ke-" + i);
}
// Output akan mencetak angka 1 sampai 5 secara otomatis


## 5. Fungsi / Functions (Blok Kode yang Bisa Dipakai Ulang)

### Konsep:
Fungsi ibarat mesin resep. Kamu merakit mesin pembuat kopi (Fungsi) satu kali saja. Setiap kali kamu memasukkan air dan bubuk kopi (Parameter), mesin itu akan mengeluarkan segelas kopi (Return). Kamu bisa menyalakan mesin itu kapan pun (Memanggil fungsi).

### Kode & Contoh Penggunaan:

    // 1. Membuat Fungsi (Mesinnya)
    function hitungTotalHarga(hargaBarang, jumlahBarang) {
        let total = hargaBarang * jumlahBarang;
        return total; // Mengembalikan hasil akhirnya
    }

    // 2. Memanggil Fungsi dan menyimpannya di variabel baru
    let totalBelanjaan = hitungTotalHarga(15000, 3);
    console.log("Total yang harus dibayar: Rp" + totalBelanjaan);

## 6. Array & Objek (Menyimpan Banyak Data)

### Konsep:

Array: Seperti rak buku berderet. Menyimpan banyak nilai dalam satu nama variabel. Urutannya dimulai dari angka 0 (disebut index).

Objek: Seperti kartu tanda penduduk (KTP). Menyimpan data berdasarkan label identitas yang jelas (disebut pasangan Key-Value).

### Kode & Contoh Penggunaan:

    // ARRAY: Kumpulan nama (diapit kurung siku)
    let daftarMateri = ["HTML", "CSS", "JavaScript"];
    console.log(daftarMateri[0]); // Output: HTML (karena indeks dimulai dari 0)

    // Menambah item ke array
    daftarMateri.push("React"); 

    // OBJEK: Detail spesifik (diapit kurung kurawal)
    let dataMahasiswa = {
        nama: "Faturahman",
        jurusan: "Teknik Informatika",
        semester: 4
    };
    console.log(dataMahasiswa.nama); // Output: Faturahman

## 7. Latihan Studi Kasus: "Sistem Kasir Sederhana dengan Diskon Member"

### Tantangan:
Peserta diminta membuat logika sebuah kasir warung. Sistem harus memiliki keranjang belanja (Array), lalu menghitung total harga menggunakan Perulangan (Loop). Jika pembeli memiliki kartu keanggotaan (Boolean), berikan diskon 10% (If-Else & Operator). Semua proses ini harus dibungkus di dalam sebuah Fungsi.

