const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 Protected Welcome Route
router.get("/welcome", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: `Welcome, ${user.username}!`, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;