const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    res.json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json({
      message: "Was unable to sign up",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    res.json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json({
      message: "Was unable to log in",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
