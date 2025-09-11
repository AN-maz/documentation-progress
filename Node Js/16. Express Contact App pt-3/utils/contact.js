// const { constats } = require("buffer");
const fs = require("fs");


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

// Cari contact
const findContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// WRITE FILE contacts.json WITH NEW DATA
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// ADDING NEW DATA CONTACT
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// DUPLIKAT
const cekDuplikat = (nama) =>{
  const constats = loadContact();
  return constats.find((contact) => contact.nama === nama);
}

// DELETE 
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts =  contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
}

// UPDATE CONTACT
const updateContact = (contactBaru) =>{
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
}
module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact};
