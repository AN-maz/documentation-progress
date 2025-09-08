const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  // const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(fileBuffer);
  const contacts = loadContact();

  // Cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // Cek noHp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("No Hp tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terima Kasih sudah memasukkan data.");
};

// LIST
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Kontak:"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

// DETAIL
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan MasPur!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan MasPur!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(`data contact ${nama} berhasil dihapus`);
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
