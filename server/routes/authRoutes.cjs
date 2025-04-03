const express = require("express");
const { registerUser, loginUser, getProfile, changePassword } = require("../controllers/authController.cjs");
const protect = require("../middlewares/authMiddleware.cjs");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/change-password", protect, changePassword);
module.exports = router;