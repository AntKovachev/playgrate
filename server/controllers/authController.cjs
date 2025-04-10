const User = require("../models/User.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "defaultsecret", {
    expiresIn: "1h",
  });
};

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ error: "Email is already in use" });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ error: "Username is already taken" });
        }
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfile = (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
};

exports.changePassword = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    console.log("Received data:", req.body);
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: "Password changed successfully!" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
