 # branstorming 1
---

# Pertemuan 05: konsep backend & API sederhana

## 1. Apa itu paket manager 

## 2. Konsep sebuah aplikasi berinteraksi 

```text
CLIENT -> API -> SERVER
```

## 3. Apa itu RESTful API 

## 4. JSON 

## 5. HTTP Method 

## 6. Pengenalan Node.js & Setup Awal Express

## 7. Anatomi Request & Response (Routing Dasar)

## 8. Middleware Dasar

## 9. Koneksi Database dengan Native SQL & Asynchronous

## 10. Tools untuk Testing API


---

# branstroming 2


## Sesi 1: Konsep Dasar (Teori & Big Picture)
Bawa mereka memahami kenapa kita butuh API sebelum menyentuh kode.

### 1. Konsep Sebuah Aplikasi Berinteraksi: 
Bahas alur CLIENT -> API -> SERVER. Gunakan diagram yang kamu buat di Draw.io untuk visualisasi.
### 2. Apa itu RESTful API: 
Jelaskan bahwa API adalah jembatannya, dan RESTful adalah aturan mainnya.
### 3. HTTP Method: 
Kenalkan aksi dasarnya (GET, POST, PUT, DELETE) yang setara dengan CRUD di database.
### 4. JSON: 
Tunjukkan format data yang menjadi "bahasa komunikasi" antara Client dan Server.

--- 
## Sesi 2: Persiapan Environment & Tools
Setelah paham konsepnya, kenalkan alat tempurnya.

### 5. Pengenalan Node.js & Apa itu Paket Manager (NPM): 
Gabungkan pengenalan Node.js dengan NPM. Jelaskan bahwa untuk membuat server, kita butuh runtime (Node) dan alat pengunduh library (NPM).

### 6. Tools untuk Testing API: 
Kenalkan Postman atau Thunder Client di sini, agar saat nanti server Express sudah menyala, mereka sudah siap menembak API-nya.
--- 

## Sesi 3: Membangun Server dengan Express
Masuk ke sesi live coding.

### 7. Setup Awal Express: 
Inisialisasi npm init, install Express, dan buat server menyala di port tertentu.

### 8. Anatomi Request & Response (Routing Dasar):
Praktik membuat route sederhana `(misal: GET /api/hello)` dan mencoba memanggilnya via Postman.

### 9. Middleware Dasar: 
Tunjukkan apa yang terjadi jika Client mengirim data JSON lewat POST tanpa express.json(). Lalu tambahkan middleware tersebut untuk melihat masalahnya terpecahkan.

## Sesi 4: Integrasi
Puncak dari pelatihan yang menghubungkan materi minggu lalu dan minggu ini.

### 10. Koneksi Database dengan Native SQL & Asynchronous:
Memanggil data sungguhan dari MySQL menggunakan async/await dan mengembalikannya sebagai JSON ke Client.

