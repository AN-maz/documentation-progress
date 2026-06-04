# 1. Bagaimana sistem saling berinteraksi

### Model Client-Server

Saat membuka website, menggunakan aplikasi mobile banking, mengirim pesan melalui media sosial, atau menonton video online, sebenarnya terjadi proses komunikasi antara dua pihak, yaitu **client** dan **server**.

Model **Client-Server** adalah arsitektur jaringan yang digunakan untuk memungkinkan perangkat saling bertukar data dan informasi melalui internet. Dalam model ini, terdapat pihak yang meminta informasi (**client**) dan pihak yang menyediakan informasi (**server**).

Model ini menjadi dasar dari hampir seluruh layanan internet modern yang digunakan saat ini.

---

## Komponen Utama dalam Model Client-Server

## 1. Client (Peminta Informasi)

**Client** adalah perangkat atau aplikasi yang bertugas meminta data atau layanan kepada server.

## Analogi Sederhana

Bayangkan sebuah restoran:

* Pelanggan memesan makanan.
* Dapur menyiapkan pesanan.
* Pelayan mengantarkan makanan kepada pelanggan.

Dalam analogi ini, **pelanggan adalah client** karena mereka mengajukan permintaan.

### Contoh Client

Beberapa contoh client yang sering digunakan antara lain:

* Browser web seperti Google Chrome, Firefox, dan Safari.
* Smartphone dan tablet.
* Aplikasi mobile.
* Program yang dibuat menggunakan bahasa pemrograman seperti Python, Java, atau C++.

### Tugas Client

Client bertanggung jawab untuk:

* Mengirim permintaan (*request*).
* Menampilkan hasil yang diterima dari server kepada pengguna.
* Menyediakan antarmuka pengguna (*User Interface/UI*).

---

## 2. Server (Penyedia Informasi)

**Server** adalah sistem yang menyediakan data, layanan, atau sumber daya yang dibutuhkan oleh client.

### Analogi Sederhana

Dalam restoran, **dapur** berperan sebagai server karena bertugas menyiapkan makanan yang diminta pelanggan.

### Karakteristik Server

Server memiliki beberapa karakteristik penting:

* Menyimpan atau mengelola data.
* Menerima dan memproses permintaan dari client.
* Mengirimkan hasil pemrosesan kembali ke client.
* Selalu aktif mendengarkan permintaan yang masuk melalui port tertentu.

### Hal yang Perlu Dipahami

Server tidak selalu berupa satu komputer fisik.

Dalam praktiknya, sebuah server dapat terdiri dari:

* Beberapa komputer.
* Virtual machine.
* Cloud server.

Server juga tidak harus menyimpan seluruh data secara langsung. Server cukup mengetahui cara mengakses data tersebut, misalnya dari database atau layanan lain.

---

## Cara Kerja Model Client-Server

Proses komunikasi antara client dan server berlangsung melalui beberapa tahap berikut.

## 1. Request (Permintaan)

Client mengirimkan permintaan kepada server.

Contoh:

Ketika pengguna membuka halaman profil Instagram, browser akan meminta data profil kepada server Instagram.

```
Client → Request → Server
```

---

## 2. Pemrosesan di Server

Setelah menerima permintaan, server akan melakukan berbagai proses, seperti:

* Mengambil data dari database.
* Memvalidasi pengguna.
* Menghubungi layanan lain (microservices).
* Mengolah data sesuai kebutuhan.

```
Client → Request → Server → Database
```

---

## 3. Response (Tanggapan)

Setelah proses selesai, server mengirimkan hasilnya kembali kepada client.

Contoh data yang dapat dikirim:

* Informasi pengguna.
* Daftar produk.
* Saldo rekening.
* Pesan kesalahan (*error message*).

```
Client ← Response ← Server
```

---

## 4. Render User Interface

Client menerima data dari server dan menampilkannya dalam bentuk yang dapat dipahami pengguna, seperti:

* Teks.
* Gambar.
* Tombol.
* Tabel.
* Grafik.

Pengguna akhirnya melihat hasil tersebut melalui layar perangkatnya.

---

## API sebagai Jembatan Komunikasi

Agar client dan server dapat saling memahami, keduanya menggunakan **API (Application Programming Interface)**.

API dapat dianggap sebagai **kontrak komunikasi** antara client dan server.

### Analogi

Ketika memesan makanan di restoran, pelanggan tidak masuk ke dapur untuk memasak sendiri. Pelanggan cukup melihat menu dan memesan makanan yang tersedia.

Menu tersebut mirip dengan API.

### Cara Kerja API

Misalnya terdapat aturan:

```
Jika client meminta data pengguna dengan ID 10,
maka server akan mengembalikan data pengguna tersebut.
```

Client tidak perlu mengetahui:

* Bagaimana data disimpan.
* Struktur database.
* Bahasa pemrograman yang digunakan server.

Client hanya perlu mengetahui:

* Endpoint API yang harus dipanggil.
* Format data yang akan diterima.

---

# HTTP sebagai Bahasa Komunikasi

Dalam komunikasi client dan server, protokol yang paling umum digunakan adalah **HTTP (Hypertext Transfer Protocol)**.

HTTP berfungsi sebagai aturan yang mengatur bagaimana data dikirim dan diterima melalui internet.

Contoh sederhana:

```
Browser → HTTP Request → Server
Server → HTTP Response → Browser
```

Tanpa HTTP atau protokol jaringan lainnya, client dan server tidak dapat saling berkomunikasi.

---
## Pendekatan Terpusat (Centralized Approach)

Model Client-Server disebut sebagai **pendekatan terpusat** (*centralized approach*).

Hal ini karena:

* Server menjadi pusat pengelolaan data.
* Data utama disimpan dan dikendalikan oleh server.
* Client bergantung pada server untuk mendapatkan informasi.

### Contoh Kasus

Saat membuka aplikasi mobile banking:

* Browser atau aplikasi hanya menampilkan antarmuka.
* Informasi saldo rekening berada di server bank.
* Transaksi diproses oleh server bank.

Tanpa server tersebut, aplikasi tidak dapat menjalankan fungsi utamanya.

Karena itulah server sering disebut sebagai **Single Source of Truth**, yaitu sumber data utama yang dianggap benar dan terpercaya.

---

## Perbandingan dengan Model Peer-to-Peer (P2P) 


Selain model Client-Server, terdapat model lain yang disebut **Peer-to-Peer (P2P)**.

## Karakteristik P2P

Pada model ini tidak ada server pusat yang mengendalikan seluruh data.

Setiap perangkat dapat berperan sebagai:

* Client (meminta data).
* Server (memberikan data).

Secara bersamaan.

### Contoh

Jaringan BitTorrent menggunakan konsep P2P.

Ketika mengunduh sebuah file:

* Pengguna mengambil bagian file dari pengguna lain.
* Pengguna juga membagikan bagian file yang dimilikinya kepada pengguna lain.

```
Komputer A ↔ Komputer B
     ↕         ↕
Komputer C ↔ Komputer D
```

Semua komputer dapat saling bertukar data tanpa bergantung pada satu server pusat.

---

# Perbedaan Client-Server dan Peer-to-Peer

| Client-Server                           | Peer-to-Peer (P2P)                                  |
| --------------------------------------- | --------------------------------------------------- |
| Memiliki server pusat                   | Tidak memiliki server pusat                         |
| Data terpusat                           | Data tersebar                                       |
| Pengelolaan lebih mudah                 | Pengelolaan lebih kompleks                          |
| Kontrol lebih terstruktur               | Kontrol tersebar                                    |
| Cocok untuk website dan aplikasi modern | Cocok untuk berbagi file dan jaringan terdistribusi |

---

# Ringkasan

* **Client** adalah pihak yang meminta data atau layanan.
* **Server** adalah pihak yang menyediakan data atau layanan.
* **HTTP** digunakan sebagai protokol komunikasi antara client dan server.
* **API** berfungsi sebagai kontrak atau jembatan komunikasi.
* Dalam model **Client-Server**, server menjadi pusat pengelolaan data (*centralized approach*).
* Pada model **Peer-to-Peer (P2P)**, setiap perangkat dapat bertindak sebagai client sekaligus server.
* Sebagian besar website, aplikasi mobile, dan layanan internet modern menggunakan arsitektur **Client-Server** sebagai fondasi utamanya.

> **Inti konsepnya:** Client meminta, Server melayani. Keduanya berkomunikasi melalui HTTP dengan aturan yang ditentukan oleh API.

---
# 2. Konsep Dasar API (Application Programming Interface)

API adalah "jembatan" yang membuat client dan server bisa saling berkomunikasi. Kalau di materi sebelumnya kita belajar *siapa yang meminta* (client) dan *siapa yang melayani* (server), sekarang kita belajar *bagaimana mereka berkomunikasi*.

## Pendahuluan

Pada aplikasi modern, berbagai sistem perlu saling bertukar data dan memanfaatkan layanan yang dimiliki sistem lain. Misalnya:

* Aplikasi ojek online menampilkan peta dari Google Maps.
* Aplikasi cuaca mengambil data dari server penyedia cuaca.
* Website login menggunakan akun Google.

Agar komunikasi tersebut dapat dilakukan dengan teratur dan aman, digunakanlah **API (Application Programming Interface)**.

API merupakan salah satu teknologi yang menjadi fondasi utama internet modern karena memungkinkan berbagai aplikasi dan sistem untuk saling berinteraksi tanpa harus mengetahui cara kerja internal masing-masing.

---

## Apa itu API?

**API (Application Programming Interface)** adalah sekumpulan aturan dan mekanisme yang memungkinkan dua aplikasi atau sistem perangkat lunak untuk saling berkomunikasi.

API menentukan:

* Permintaan apa yang dapat dilakukan.
* Data apa yang harus dikirim.
* Format data yang digunakan.
* Respons yang akan diberikan.

Dengan kata lain, API bertindak sebagai **perantara komunikasi** antara client dan server.

---

## Analogi Sederhana

### API sebagai Menu Restoran

Bayangkan Anda berada di sebuah restoran.

* Anda adalah client.
* Dapur adalah server.
* Menu restoran adalah API.

Pelanggan tidak perlu masuk ke dapur dan memahami cara memasak makanan.

Pelanggan cukup melihat menu yang tersedia lalu memesan makanan sesuai aturan yang ada.

Begitu pula pada API.

Client tidak perlu mengetahui bagaimana kode program server dibuat. Client hanya perlu mengetahui:

* Permintaan apa yang tersedia.
* Data apa yang harus dikirim.
* Hasil apa yang akan diterima.

---

## Mengapa API Penting?

## 1. Membawa Keteraturan dalam Komunikasi

Tanpa API, setiap sistem akan memiliki cara komunikasi yang berbeda-beda sehingga sulit untuk diintegrasikan.

API menyediakan aturan yang jelas sehingga semua sistem dapat berkomunikasi dengan cara yang sama.

---

## 2. Menyediakan Abstraksi

API menyembunyikan kompleksitas sistem di belakang layar.

Client tidak perlu mengetahui:

* Struktur database.
* Bahasa pemrograman yang digunakan.
* Algoritma yang berjalan di server.

Client cukup mengetahui cara menggunakan API tersebut.

---

## 3. Mempercepat Pengembangan Aplikasi

Developer tidak perlu membangun semua fitur dari nol.

Mereka dapat memanfaatkan API yang sudah tersedia, seperti:

* API Google Maps untuk peta.
* API pembayaran untuk transaksi.
* API media sosial untuk login dan berbagi konten.

Hal ini membuat pengembangan aplikasi menjadi lebih cepat dan efisien.

---

## 4. Menyediakan Standar Penanganan Error

API juga menentukan apa yang harus terjadi ketika terjadi kesalahan.

Contohnya:

* Data tidak lengkap.
* Pengguna tidak memiliki izin.
* Permintaan terlalu banyak.

Dengan aturan yang jelas, client dapat mengetahui penyebab kegagalan dan cara menanganinya.

---

## Hubungan API dengan Model Client-Server

Perhatikan ilustrasi berikut:

```text
Client
   │
   │ Request
   ▼
 API
   │
   ▼
Server
   │
   │ Response
   ▼
Client
```

Pada model Client-Server:

* Client mengirim permintaan.
* API menerima dan menerjemahkan permintaan tersebut.
* Server memproses permintaan.
* API mengirimkan hasil kembali ke client.

Karena itu, API sering disebut sebagai **jembatan komunikasi antara client dan server**.

---

## Komponen Utama dalam API

Ketika membaca dokumentasi API, terdapat beberapa komponen penting yang harus dipahami.

## 1. Endpoint

Endpoint adalah alamat tujuan API yang akan dipanggil oleh client.

Contoh:

```text
https://api.website.com/users
```

Alamat tersebut menunjukkan lokasi sumber data yang ingin diakses.

### Analogi

Jika API adalah restoran, maka endpoint adalah meja atau loket tertentu tempat Anda melakukan pemesanan.

---

## 2. HTTP Method

Method menentukan tindakan yang ingin dilakukan terhadap data.

Method yang paling sering digunakan adalah:

| Method | Fungsi                    |
| ------ | ------------------------- |
| GET    | Mengambil data            |
| POST   | Menambahkan data baru     |
| PUT    | Memperbarui seluruh data  |
| PATCH  | Memperbarui sebagian data |
| DELETE | Menghapus data            |

### Contoh

Mengambil daftar pengguna:

```http
GET /users
```

Menambahkan pengguna baru:

```http
POST /users
```

---

## 3. Parameter

Parameter adalah data yang dikirim client agar server dapat memproses permintaan.

### Required Parameter

Wajib dikirim.

Jika tidak ada, server akan menolak permintaan.

Contoh:

```json
{
  "username": "Purwa"
}
```

---

### Optional Parameter

Boleh dikirim atau tidak.

Biasanya digunakan untuk fitur tambahan.

Contoh:

```json
{
  "username": "Purwa",
  "location": "Bandung"
}
```

---

## 4. Authentication

Authentication digunakan untuk memastikan identitas pengguna yang memanggil API.

Tujuannya adalah:

* Mencegah penyalahgunaan.
* Menjaga keamanan data.
* Mengontrol akses pengguna.

Contoh:

```http
Authorization: Bearer abc123xyz
```

Token tersebut berfungsi seperti kartu identitas ketika mengakses layanan API.

---

## 5. Rate Limiting

Rate Limiting adalah pembatasan jumlah request yang boleh dilakukan dalam periode tertentu.

Contoh:

```text
100 request per jam
```

Jika batas tersebut terlampaui, server dapat menolak request berikutnya.

Tujuannya untuk:

* Mengurangi spam.
* Mengurangi beban server.
* Mencegah penyalahgunaan layanan.

---

## 6. Response Format

Response adalah data yang dikembalikan oleh server.

Format yang paling umum digunakan saat ini adalah **JSON (JavaScript Object Notation)**.

Contoh:

```json
{
  "id": 1,
  "nama": "Purwa",
  "jurusan": "Informatika"
}
```

JSON populer karena:

* Ringan.
* Mudah dibaca manusia.
* Mudah diproses oleh program.

---

## Alur Kerja API

Secara umum proses komunikasi API berlangsung sebagai berikut:

### 1. Client Mengirim Request

```http
GET /users/1
```

---

### 2. API Menerima Request

API memeriksa:

* Endpoint
* Method
* Parameter
* Authentication

---

### 3. Server Memproses Request

Server dapat:

* Mengambil data dari database.
* Menyimpan data baru.
* Memvalidasi pengguna.
* Berkomunikasi dengan layanan lain.

---

### 4. Server Mengirim Response

Contoh:

```json
{
  "id": 1,
  "nama": "Purwa"
}
```

---

### 5. Client Menampilkan Hasil

Data yang diterima kemudian ditampilkan kepada pengguna dalam bentuk:

* Teks
* Tabel
* Tombol
* Grafik
* Halaman web

---

## Studi Kasus: Mengirim Tweet melalui API

Misalkan sebuah aplikasi ingin membuat tweet secara otomatis.

### Request

Client mengirimkan:

```http
POST /statuses/update
```

Dengan data:

```json
{
  "status": "Hello World"
}
```

---

### Proses di Server

Server akan:

1. Memeriksa identitas pengguna.
2. Memastikan teks tweet valid.
3. Memastikan tweet tidak duplikat.
4. Menyimpan tweet ke database.

---

### Response Sukses

```json
{
  "id": 123456,
  "text": "Hello World",
  "created_at": "2025-05-24"
}
```

---

### Response Gagal

Jika pengguna mencoba mengirim tweet yang sama secara berulang:

```json
{
  "error": "Status is a duplicate"
}
```

Server juga dapat mengirim kode error seperti:

```text
403 Forbidden
```

yang menandakan bahwa permintaan ditolak.

---

## Ringkasan

* **API (Application Programming Interface)** adalah mekanisme yang memungkinkan aplikasi saling berkomunikasi.
* API bertindak sebagai **jembatan antara client dan server**.
* API mendefinisikan aturan mengenai request dan response.
* Komponen penting API meliputi:

  * Endpoint
  * HTTP Method
  * Parameter
  * Authentication
  * Rate Limiting
  * Response Format
* Format data yang paling umum digunakan adalah **JSON**.
* API memungkinkan developer membangun aplikasi lebih cepat dengan memanfaatkan layanan yang sudah tersedia.

> **Inti konsep API:** API adalah kontrak komunikasi. Client mengirim request sesuai aturan yang telah ditentukan, kemudian server mengembalikan response yang sesuai dengan perjanjian tersebut.

# 3. JSON (JavaScript Object Notation)

## Apa itu JSON?

**JSON (JavaScript Object Notation)** adalah format pertukaran data yang digunakan untuk menyimpan dan mengirim informasi antar sistem.

JSON dirancang agar:

* Mudah dibaca oleh manusia.
* Mudah diproses oleh komputer.
* Ringan dan sederhana.
* Dapat digunakan oleh hampir semua bahasa pemrograman.

Saat ini JSON menjadi format data yang paling umum digunakan dalam API dan komunikasi antara client dan server.

---

## Mengapa JSON Dibutuhkan?

Bayangkan sebuah server ingin mengirim data pengguna kepada browser.

Tanpa format yang terstruktur, data mungkin terlihat seperti ini:

```text
Purwa,20,Informatika,Bandung
```

Komputer mungkin masih bisa membacanya, tetapi akan sulit mengetahui:

* Mana nama?
* Mana umur?
* Mana jurusan?
* Mana kota?

JSON memberikan struktur yang jelas:

```json
{
  "nama": "Purwa",
  "umur": 20,
  "jurusan": "Informatika",
  "kota": "Bandung"
}
```

Sekarang baik manusia maupun program langsung tahu arti setiap data.

---

## Struktur Dasar JSON

JSON terdiri dari pasangan:

```text
"key": value
```

Contoh:

```json
{
  "nama": "Purwa"
}
```

Di sini:

* `nama` → key
* `"Purwa"` → value

Key berfungsi sebagai label yang menjelaskan isi data.

---

## JSON Object

Object adalah kumpulan pasangan key-value yang dibungkus dengan kurung kurawal `{}`.

Contoh:

```json
{
  "nama": "Purwa",
  "umur": 22,
  "aktif": true
}
```

Visualisasinya:

```text
Data Mahasiswa
│
├── nama  = Purwa
├── umur  = 22
└── aktif = true
```

---

## JSON Array

Array digunakan untuk menyimpan banyak data dalam satu variabel.

Ditulis menggunakan kurung siku `[]`.

Contoh:

```json
{
  "hobi": ["Ngoding", "Membaca", "Gaming"]
}
```

Visualisasinya:

```text
hobi
│
├── Ngoding
├── Membaca
└── Gaming
```

---

## JSON Object di Dalam Object

JSON dapat menyimpan object di dalam object lainnya.

Contoh:

```json
{
  "nama": "Purwa",
  "alamat": {
    "kota": "Bandung",
    "provinsi": "Jawa Barat"
  }
}
```

Visualisasinya:

```text
nama
└── Purwa

alamat
│
├── kota      = Bandung
└── provinsi = Jawa Barat
```

---

## JSON Array Berisi Object

Ini adalah bentuk yang paling sering ditemukan pada API.

Contoh:

```json
{
  "mahasiswa": [
    {
      "nama": "Purwa",
      "umur": 22
    },
    {
      "nama": "Andrian",
      "umur": 21
    }
  ]
}
```

Visualisasinya:

```text
mahasiswa
│
├── Mahasiswa 1
│   ├── nama = Purwa
│   └── umur = 20
│
└── Mahasiswa 2
    ├── nama = Andrian
    └── umur = 21
```

---

## Tipe Data yang Didukung JSON

JSON hanya memiliki beberapa tipe data utama.

| Tipe    | Contoh                |
| ------- | --------------------- |
| String  | `"Purwa"`             |
| Number  | `20`, `3.14`          |
| Boolean | `true`, `false`       |
| Array   | `["A", "B"]`          |
| Object  | `{ "nama": "Purwa" }` |
| Null    | `null`                |

Contoh lengkap:

```json
{
  "nama": "Purwa",
  "umur": 20,
  "aktif": true,
  "hobi": ["Ngoding", "Gaming"],
  "alamat": null
}
```

---

## JSON dalam API

Misalkan client meminta data pengguna.

### Request

```http
GET /users/1
```

### Response

```json
{
  "id": 1,
  "nama": "Purwa",
  "email": "Purwa@mail.com"
}
```

Alurnya:

```text
Client
   │
   │ GET /users/1
   ▼
Server
   │
   │ JSON Response
   ▼
Client
```

Browser atau aplikasi kemudian membaca JSON tersebut dan menampilkannya kepada pengguna.

---

## Hubungan JSON dengan JavaScript

Nama JSON memang berasal dari JavaScript, tetapi JSON **bukan JavaScript**.

JSON hanyalah format data.

Bahasa lain juga bisa menggunakannya, seperti:

* JavaScript
* Python
* Java
* PHP
* Go
* C#
* Rust

Karena itulah JSON menjadi standar pertukaran data di internet.

---

## Contoh Nyata dari API

Misalkan API kampus mengembalikan data mahasiswa:

```json
{
  "nim": "23101101",
  "nama": "Purwa Kurnia",
  "jurusan": "Informatika",
  "semester": 4,
  "mata_kuliah": [
    "Pemrograman Web",
    "Jaringan Komputer",
    "Basis Data"
  ]
}
```

Frontend dapat mengambil data tersebut lalu menampilkannya menjadi:

```text
Nama      : Purwa Guri
Jurusan   : Informatika
Semester  : 4

Mata Kuliah:
- Pemrograman Web
- Jaringan Komputer
- Basis Data
```

---

## Perbedaan JSON dan Object JavaScript

Sekilas terlihat sama, tetapi ada perbedaan:

### Object JavaScript

```js
const mahasiswa = {
  nama: "Purwa",
  umur: 22
};
```

### JSON

```json
{
  "nama": "Purwa",
  "umur": 22
}
```

Perbedaannya:

| JavaScript Object           | JSON                                    |
| --------------------------- | --------------------------------------- |
| Bisa menyimpan function     | Tidak bisa                              |
| Digunakan di dalam program  | Digunakan untuk pertukaran data         |
| Key boleh tanpa tanda kutip | Key harus menggunakan tanda kutip ganda |

---

## Ringkasan

* **JSON (JavaScript Object Notation)** adalah format pertukaran data yang paling populer di internet.
* JSON terdiri dari pasangan **key-value**.
* JSON mendukung:

  * Object (`{}`)
  * Array (`[]`)
  * String
  * Number
  * Boolean
  * Null
* JSON banyak digunakan sebagai format **response API**.
* Hampir semua bahasa pemrograman dapat membaca dan menghasilkan JSON.
* Saat frontend dan backend bertukar data, kemungkinan besar data tersebut dikirim dalam bentuk JSON.

> **Inti konsep JSON:** JSON adalah "bahasa data" yang digunakan client dan server untuk saling bertukar informasi secara terstruktur dan mudah dipahami.


