
/* 
    Tipe Data Object
    - Tipe data object, data yang mirip dengan array 
    - yang membedakan indexnya bisa berupa string 
    - index di object disebut dengan property/atribute
*/

document.title = "Object"

const person = {}

// Menambah dan mengurang
person["name"] = "Purwa"
person["address"] = "PurwaNesia"
person["age"] = 30

delete person["age"]
console.table(person)

// Membuat object
const person2 = {
    nama : "Kirito",
    address : "Nihon",
    age : 18
}
console.table(person2)

// mengakses object
console.info(`Name : ${person2.name}`)
console.info(`address : ${person2.address}`)
console.info(`age : ${person2.age}`)