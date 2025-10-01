// let mahasiswa = {
//     nama: "Purwa",
//     NIM: "245512345",
//     email: "purwaguri123@gmail"
// }

// console.log(JSON.stringify(mahasiswa));

// CARA VALLINA JS

// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         let mahasiswa = JSON.parse(this.responseText);
//         console.log(mahasiswa);
//     }
// }
// xhr.open('GET', 'coba.json', true);
// xhr.send();

// stringify: Objek -> Json
// Parse : Json -> Objek

$.getJSON('coba.json', function(data){
    console.log(data);
});