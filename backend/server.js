import express from "express";
import dotenv from "dotenv";
import DbConnection from "./config/db.js";
import products from "./routes/product.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

DbConnection();
const app = express();
const PORT = process.env.PORT;
app.get("/health", (_req, res) => {
  res.send(`Server is running in port: ${PORT}`);
});

app.use("/api/products", products);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT);
