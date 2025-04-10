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

router.get("/:rawg_game_id", async (req, res) => {
    const { rawg_game_id } = req.params;

    try {
      const comments = await Comment.find({ rawg_game_id }).sort({ created_at: -1 });
      res.json(comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });


module.exports = router;
