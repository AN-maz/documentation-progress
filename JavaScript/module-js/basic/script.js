const outputElement = document.getElementById("id");

// ARRAY
let buah = ["Apel", "Jeruk", "Mangga"];

// ITERASI ARRAY
let daftarBuah = "";

buah.forEach(function (item) {
  daftarBuah += item + "<br>";
});

// OBJECT
let siswa = {
  nama: "Budi Santoso",
  umur: 20,
  lulus: true,
};

// Menampilkan ke HTML
outputElement.innerHTML = `
  <h3>Belajar Array dan Object</h3>

  <b>Isi Array Buah:</b><br>
  ${daftarBuah}

  <br>

  <b>Data Siswa:</b><br>
  Nama: ${siswa.nama} <br>
  Umur: ${siswa.umur} <br>
  Lulus: ${siswa.lulus}
`;