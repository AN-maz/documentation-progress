// Function
function cetaknama(nama){
    return `Halo..Nama sy ${nama}`;
}

// Variable
const PI = 3.14;

// Object
const mahasiswa = {
    nama : 'Akane Kurogawa',
    umur : 20,
    cetakMhs(){
        return `Halo, nama sy ${this.nama} dan sy ${this.umur} tahun`;  
    },
};

// class

class Orang{
    constructor(){
        console.log('Objek Orang telah dibuat MasPur!');
    }
}


// cara 1
// module.exports.cetaknama = cetaknama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// cara 2
module.exports = {cetaknama,PI,mahasiswa,Orang};