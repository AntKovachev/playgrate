const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  rawg_game_id: {
    type: String,
    required: true,
    maxlength: 100
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment_text: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
