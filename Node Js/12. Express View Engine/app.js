const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

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
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Categoty ID : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 MasPur!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
