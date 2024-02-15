const User = require("../model/auth-model");
const bcrypt = require("bcryptjs");
const generatetokenAndSetCookie = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mismatched password" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    console.log(hashpassword);

    const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullname,
      username,
      password: hashpassword,
      gender,
      profilepicture: gender === "male" ? boyProfilepic : girlProfilepic,
    });
    if (newUser) {
      generatetokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilepicture: newUser.profilepicture,
      });
    } else {
      res.status(404).json({ error: "Invalid username" });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generatetokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepicture: user.profilepicture,
    });
  } catch (error) {
    console.log(" error in login console", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
