
// Tipe data Array di JS sifatnya dinamis
// Satu araay bisa banyak tipe data di dalamnya 

document.title = "Tipe-data-array"

let arrayKosong = []
let arrayNama = ["Purwa","Guri","Kamazaki"]

// Operasi di array 

// =======================
// Membuat Array
// =======================
const names = [];

// =======================
// Menambah Data ke Array
// =======================
names.push("Kirito");
names.push("Naruto", "Sumanto");

console.log("Setelah ditambah:");
console.table(names);


// =======================
// Menghitung Panjang Array
// =======================
console.log("Panjang array:", names.length);


// =======================
// Mendapatkan Index Array
// =======================

// Index dimulai dari 0
console.log("Index ke-0:", names[0]);
console.log("Index ke-1:", names[1]);
console.log("Index ke-2:", names[2]);


// =======================
// Mengubah Data di Array
// =======================
names[0] = "Luffy";

console.log("Setelah diubah:");
console.table(names);


// =======================
// Menghapus Data di Array
// =======================

// Menghapus index tertentu
delete names[1];

console.log("Setelah delete index 1:");
console.table(names);


// =======================
// Cara Lain Menghapus (Lebih Disarankan)
// =======================

// Menghapus dan merapikan index
names.splice(1, 1); // hapus 1 data dari index ke-1

console.log("Setelah splice:");
console.table(names);


// =======================
// Tambahan Penting
// =======================

// Menambah di depan
names.unshift("Zoro");

// Menghapus dari belakang
names.pop();

// Menghapus dari depan
names.shift();

console.log("Operasi tambahan:");
console.table(names);


