const contacts = require('./contacts');

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Masukkan nama anda: ');
    const email = await contacts.tulisPertanyaan('Masukkan email anda: ');
    const noHp = await contacts.tulisPertanyaan('Masukkan noHp anda: ');

    contacts.simpanContact(nama,email,noHp);
};

main();