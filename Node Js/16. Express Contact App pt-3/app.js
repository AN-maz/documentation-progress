const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

// CONFIG FLASH MESSAGE
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

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
  const contacts = loadContact();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // JIKA CONTACT TIDAK ADA
  if (!contact) {
    req.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data Contact Berhasil Dihapus MasPur!");
    res.redirect("/contact");
  }
});

// FORM EDIT CONTACT
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", {
    title: "Form Edit Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// PROSES UBAH DATA
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);

      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Ada MasPur!");
      }
      return true;
    }),
    check("email", "Email Ga Palid MasPur!").isEmail(),
    check("nohp", "No Hp Ga Palid MasPur!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body);
      req.flash("msg", "Data Contact Berhasil Diubah MasPur!");
      res.redirect("/contact");
    }
  }
);

// Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

// ADDING NEW CONTACT
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Ada MasPur!");
      }
      return true;
    }),
    check("email", "Email Ga Palid MasPur!").isEmail(),
    check("nohp", "No Hp Ga Palid MasPur!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "Data Contact Berhasil Ditambahkan MasPur!");
      res.redirect("/contact");
    }
  }
);

// Proses Data Contact
app.get("/contact/:nama", (req, res) => {
  const contacts = findContact(req.params.nama);

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact Page",
    contacts,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 MasPur!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
