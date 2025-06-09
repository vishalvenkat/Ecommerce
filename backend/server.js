import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.get("/health", (_req, res) => {
  res.send(`Server is running in port: ${PORT}`);
});

app.listen(PORT);
