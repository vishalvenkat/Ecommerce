import express from "express";
import dotenv from "dotenv";
import products from "../backend/data/products.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.get("/health", (_req, res) => {
  res.send(`Server is running in port: ${PORT}`);
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === Number(req.params.id)
  );
  res.json(product);
});

app.listen(PORT);
