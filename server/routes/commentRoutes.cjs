const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.cjs");

// POST /comments
router.post("/", async (req, res) => {
  try {
    const { rawg_game_id, user_id, comment_text } = req.body;

    if (!rawg_game_id || !user_id || !comment_text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({ rawg_game_id, user_id, comment_text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
