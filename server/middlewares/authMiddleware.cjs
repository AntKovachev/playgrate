const jwt = require("jsonwebtoken");
const User = require("../models/User.cjs");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;