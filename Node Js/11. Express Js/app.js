// const http = require("http");
// const port = 3000;
// const fs = require("fs");

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Error: file not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const url = req.url;

//     switch (url) {
//       case "/about":
//         renderHTML("./about.html", res);
//         break;
//       case "/contact":
//         renderHTML("./contact.html", res);
//         break;
//       default:
//         renderHTML("./index.html", res);
//         break
//     }

//     // if (url === "/contact") {
//     //   renderHTML("./contact.html", res);
//     // } else if (url === "/about") {
//     //   renderHTML("./about.html", res);
//     // } else {
//     //   renderHTML("./index.html", res);
//     // }
//   })
//   .listen(port, () => {
//     console.log("Server is listening on port 3000...");
//   });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("Home Page!");

  // res.json({
  //   nama: "purwa",
  //   email: "purwa12@gmail.com",
  //   noHp: "081234",
  // });

  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
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
