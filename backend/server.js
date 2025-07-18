import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DbConnection from "./config/db.js";
import products from "./routes/product.js";
import orders from "./routes/order.js";
import user from "./routes/user.js";
import reviews from "./routes/review.js";
import upload from "./routes/upload.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

DbConnection();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies for authentication

const PORT = process.env.PORT;

app.use("/api/products", products);
app.use("/api/users", user);
app.use("/api/orders", orders);
app.use("/api/upload", upload);
app.use("/api/reviews", reviews);

// Serve static files from the 'uploads' directory
// This allows access to uploaded files via a URL like /uploads/filename.jpg
// __dirname is used to get the current directory of the script
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  // The build directory contains the production-ready React app
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Handle any requests that don't match the above routes
  // This will serve the React app for any route that is not handled by the API routes
  // This is useful for single-page applications (SPAs) where the frontend handles routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/build/index.html"));
  });
} else {
  app.get("/health", (_req, res) => {
    res.send(`Server is running in port: ${PORT}`);
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(PORT);
