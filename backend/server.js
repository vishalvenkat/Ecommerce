import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DbConnection from "./config/db.js";
import products from "./routes/product.js";
import orders from "./routes/order.js";
import user from "./routes/user.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

DbConnection();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies for authentication

const PORT = process.env.PORT;
app.get("/health", (_req, res) => {
  res.send(`Server is running in port: ${PORT}`);
});

app.use("/api/products", products);
app.use("/api/users", user);
app.use("/api/orders", orders);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT);
