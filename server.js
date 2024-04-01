require("dotenv").config();
const express = require("express");
const app = express();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json(API_KEY);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
