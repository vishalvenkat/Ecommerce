import express from "express";

const app = express();
const PORT = 5000;
app.get("/health", (_req, res) => {
  res.send(`Server is running in port: ${PORT}`);
});

app.listen(PORT);
