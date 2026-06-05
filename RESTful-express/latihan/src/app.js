const express = require("express");
const productRoutes = require("./routes/product.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Selamat datang di API Inventory!");
});

app.use("/api/products", productRoutes);

module.exports = app;
