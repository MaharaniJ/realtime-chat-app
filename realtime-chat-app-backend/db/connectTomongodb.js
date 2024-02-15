const mongoose = require("mongoose");
require("dotenv").config();

const mongooseConnection = async () => {
  try {
    const DB = process.env.MONGO_URI;
    await mongoose.connect(DB);
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongooseConnection;
