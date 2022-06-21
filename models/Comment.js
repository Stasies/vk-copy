const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    type: Array,
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
    comment: {
      type: String,
    },
    username: {
      type: String,
    },
    commentlikes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
