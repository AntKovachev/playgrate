const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.cjs");
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

      // Populate the user_id field with the username
      const populatedComment = await newComment.populate("user_id", "username email");

      res.status(201).json(populatedComment);
    } catch (err) {
      console.error("Error saving comment:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

// GET /comments/:rawg_game_id
router.get("/:rawg_game_id", async (req, res) => {
  const { rawg_game_id } = req.params;

  try {
    const comments = await Comment.find({ rawg_game_id }).sort({
      created_at: -1,
    }).populate("user_id", "username email");
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Edit Comment (PUT)
router.put("/:id", authMiddleware, async (req, res) => {
  const { comment_text } = req.body;
  const { user_id } = req.user;

  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own comments" });
    }

    comment.comment_text = comment_text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update comment" });
  }
});

// Delete Comment (DELETE)
router.delete("/:id", authMiddleware, async (req, res) => {
  const { user_id } = req.user;

  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await comment.remove();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

module.exports = router;
