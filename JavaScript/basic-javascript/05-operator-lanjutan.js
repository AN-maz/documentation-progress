// OPERATOR UNARY

document.writeln("<h2>Operator Unary</h2>");

let y = 5;

document.writeln(+y); // positif (jarang dipakai)
document.writeln("<br>");

document.writeln(-y); // negatif
document.writeln("<br>");

y++; // increment (tambah 1)
document.writeln(y); // 6
document.writeln("<br>");

y--; // decrement (kurang 1)
document.writeln(y); // 5
document.writeln("<br>");

let isLogin = true;
document.writeln(!isLogin); // false (negasi)

document.writeln("<hr>");

// OPERATOR PERBANDINGAN

document.writeln("<h2>Operator Perbandingan</h2>");

let a = 10;
let b = 5;

document.writeln(a > b);  // true
document.writeln("<br>");

document.writeln(a < b);  // false
document.writeln("<br>");

document.writeln(a >= 10); // true
document.writeln("<br>");

document.writeln(a <= 5);  // false
document.writeln("<br>");

document.writeln(a == "10"); // true (nilai sama, tipe beda tidak masalah)
document.writeln("<br>");

document.writeln(a === "10"); // false (harus sama tipe & nilai)
document.writeln("<br>");

document.writeln(a != 10); // false
document.writeln("<br>");

document.writeln(a !== "10"); // true

document.writeln("<hr>");

// OPERATOR LOGIKA
document.writeln("<h2>Operator Logika</h2>");

let umur1 = 20;
let punyaKTP = true;

// AND (&&) → harus dua-duanya true
document.writeln(umur1 >= 17 && punyaKTP); // true
document.writeln("<br>");

// OR (||) → salah satu true sudah cukup
document.writeln(umur1 < 17 || punyaKTP); // true
document.writeln("<br>");

// NOT (!) → membalik nilai
document.writeln(!punyaKTP); // false
