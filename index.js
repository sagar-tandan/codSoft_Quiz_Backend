const express = require("express");
const app = express();

const path = require("path");

require("dotenv").config();
const cors = require("cors");

const db = require("./config/db");

const userRoute = require("./routes/userRoutes");
const quizRoute = require("./routes/quizRoutes");
const resultRoute = require("./routes/resultRoutes");
const logger = require("morgan");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/users", userRoute);
app.use("/api/quizs", quizRoute);
app.use("/api/results", resultRoute);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
