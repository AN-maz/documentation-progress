// Core mudule
// File System
const fs = require('fs');
// console.log(fs);

// 1. menulis string ke file (synchronous)
// try{
//     fs.writeFileSync('data/text.txt','Hello MasPur secara syncronous!');
// }catch(e){
//     console.log(e);
// }

// 2. menulis string ke file (asynchronous)
// fs.writeFile('data/text.txt','Hallo MasPur! secara asynchronous', (e)=> {
//     console.log(e);
// });

// 3. MEMBACA ISI FILE (SYNCHRONOUS)
// const data = fs.readFileSync('data/text.txt','utf-8');
// console.log(data);

// 4. MEMBACA ISI FILE (ASYNCHRONOUS)

// cara 1 - Callback (asynchronous klasik)
// const fs = require('fs');

// fs.readFile('data/text.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.error("Error:", err);
//         return;
//     }
//     console.log(data);
// });

// console.log("Baris ini tetap jalan dulu, tanpa nunggu file dibaca.");

// cara 2 - Promise + async/await (lebih modern)
// const fs = require("fs").promises;

// async function bacaFile(params) {
//   try {
//     const data = await fs.readFile("data/text.txt", "utf-8");
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
// bacaFile();
// console.log("Baris ini tetap jalan dulu, tanpa nunggu file dibaca.");

// 4. ReadLine
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda: ', (nama) => {
    rl.question('Masukkan noHp anda: ', (noHp) =>{  
        const contact = {nama,noHp};
        const file = fs.readFileSync('data/contacts.json','utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);
        fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
        conlose.log('TerimaKasih sudah memasukkan data');
        rl.close
    });
});
