# 📦 Eksperimen CSS Flexbox

Project ini adalah wadah eksperimen dan catatan belajar saya mengenai **CSS Flexbox**. Tujuannya adalah untuk memahami bagaimana Flexbox mengatur tata letak elemen di dalam sebuah container web.

## 📝 Catatan Belajar Flexbox (Cheat Sheet)

Flexbox bekerja dengan konsep **Container** (induk) dan **Items** (anak). Untuk mulai menggunakan Flexbox, kita harus memberikan perintah pada *container*-nya.

### 1. Properti untuk `.container` (Parent)
Properti di bawah ini ditulis di dalam class pembungkusnya:

* **`display: flex;`** -> **Wajib ada!** Ini adalah mantra ajaib untuk mengubah elemen biasa menjadi Flex Container. Secara default, elemen di dalamnya akan berjejer ke samping (horizontal).
* **`gap: 10px;`** -> Memberikan jarak (spasi) antar *flex items* tanpa perlu pusing mengatur margin.
* **`flex-direction`** -> Mengatur arah barisan item.
    * `row` (default): Kiri ke kanan.
    * `column`: Atas ke bawah.
* **`justify-content`** -> Mengatur posisi item secara **horizontal** (searah garis utama/Main Axis).
    * `flex-start` (default): Rata kiri.
    * `center`: Di tengah.
    * `space-between`: Menyebar dengan spasi kosong di antara item.
* **`align-items`** -> Mengatur posisi item secara **vertikal** (searah garis silang/Cross Axis).
    * `stretch` (default): Item ditarik memenuhi tinggi container.
    * `center`: Berada di tengah-tengah vertikal.

### 2. Struktur Kode Saat Ini
Saat ini, eksperimen menggunakan file HTML sederhana dengan 1 `.container` dan 6 `.item` di dalamnya.

```css
.container {
    display: flex;
    gap: 10px;
    /* Eksperimen selanjutnya bisa ditambahkan di sini */
}