/**
 * =========================================
 * 02 - CONSOLE JAVASCRIPT
 * =========================================
 * Digunakan untuk:
 * - Logging
 * - Debugging
 * - Monitoring data
 * =========================================
 */


/**
 * =========================================
 * 1. console.log()
 * =========================================
 * Menampilkan output biasa ke console
 */

console.log("Ini console.log");
console.log(123);
console.log(true);


/**
 * =========================================
 * 2. console.info()
 * =========================================
 * Mirip console.log, tapi biasanya untuk info
 */

console.info("Ini adalah informasi");


/**
 * =========================================
 * 3. console.warn()
 * =========================================
 * Menampilkan peringatan (warna kuning di console)
 */

console.warn("Ini peringatan!");


/**
 * =========================================
 * 4. console.error()
 * =========================================
 * Menampilkan error (warna merah di console)
 */

console.error("Ini error!");


/**
 * =========================================
 * 5. console.table()
 * =========================================
 * Menampilkan data dalam bentuk tabel
 */

// Array
const buah = ["Apel", "Mangga", "Jeruk"];
console.table(buah);

// Object
const user = {
  nama: "ANmaz",
  umur: 20,
  status: "Mahasiswa"
};
console.table(user);

// Array of Object (paling sering dipakai)
const users = [
  { nama: "A", umur: 20 },
  { nama: "B", umur: 22 },
  { nama: "C", umur: 19 }
];
console.table(users);


/**
 * =========================================
 * 6. Tips Debugging
 * =========================================
 */

// Contoh debugging sederhana
let angka = 10;

console.log("Nilai awal:", angka);

angka += 5;

console.log("Setelah ditambah 5:", angka);