
// Konversi Int, Float, Number

const value1 = parseInt("1")
const value2 = 2
const sum = value1 + value2

document.writeln(sum)

document.writeln(`<p>${parseInt("1.9")}<p>`)
document.writeln(`<p>${parseFloat("1.9")}<p>`)
document.writeln(`<p>${Number("1.9")}<p>`)

// Konversi String

const a = 2
const b = 2
const total = a.toString() + b.toString()

document.writeln("String: " + total)

// NaN (Not a Number)
document.writeln(`<p>${Number("1.9s")}<p>`) 

    // Operasi pada NaN : akan tetap menjadi NaN 
    const value3 = 10
    const value4 = Number("salah")
    const sum2 = value3 + value4

    document.writeln(`${sum2}`)

    document.writeln(`<br>`)

    // IsNaN: Pengecekan Apakah NaN atau bukan 
    document.writeln(`Cek NaN: ${isNaN(value4)}`)

