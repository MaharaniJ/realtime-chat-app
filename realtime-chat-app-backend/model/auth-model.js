const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  profilepicture: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("User", authSchema);
module.exports = User;
