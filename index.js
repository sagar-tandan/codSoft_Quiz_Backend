const express = require("express");
const app = express();

const path = require("path");
const db = require("./config/db");

require("dotenv").config();
const cors = require("cors");

const logger = require("morgan");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
