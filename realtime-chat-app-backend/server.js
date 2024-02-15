const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/auth.route"); // Import the auth router

const connectToMongoDB = require("./db/connectTomongodb");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/auth", authRouter); // Mount the auth router at /api/auth

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("listening on port " + PORT);
});
