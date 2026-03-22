

const nama_depan = "Purwa"
const nama_belakang = "Guri"

const template = `Nama :${nama_depan} ${nama_belakang}`
console.info(template);

// Expression Tempate
const nama = "Purwaa"
const nilai = 80

const template2 = `Nama: ${nama}, Lulus : ${nilai > 75}`;
console.info(template2);

// Multiline
let multiLine = `
    Belajar JavaScript Basic
    Sangat menyenangkan sekali 
    untuk seorang programmer pemula 
`

document.writeln("<pre>")
document.writeln(multiLine)
document.writeln("<pre>")

