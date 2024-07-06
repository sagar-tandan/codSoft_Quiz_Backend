const { config, configDotenv } = require("dotenv");
const mongoose = require("mongoose");
config(configDotenv);

// Connect to MongoDB using the provided environment variable
mongoose.connect(process.env.MONGO_URL);

// Get the default connection
const connectionDb = mongoose.connection;

// Bind connection events
connectionDb.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

connectionDb.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

module.exports = connectionDb;
