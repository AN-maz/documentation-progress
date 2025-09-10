const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {loadContact, findContact} = require('./utils/contact');

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('public'));


const mahasiswa = [
  {
    nama: "Purwa",
    email: "purwa12@gmail.com",
  },
  {
    nama: "Akane",
    email: "akane11@gmail.com",
  },
  {
    nama: "Aqua",
    email: "aqua11@gmail.com",
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    nama: "Purwa",
    mahasiswa,
    layout: "layouts/main-layout",
    title: "Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "About Page",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact(req.params.nama);

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
    contacts
  });
});

app.get("/contact/:nama", (req, res) => {
  const contacts = findContact(req.params.nama);

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact Page",
    contacts
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 MasPur!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
