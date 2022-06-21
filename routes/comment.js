const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

//create a comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  const post = await Post.findById(req.body.postId);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
    await post.updateOne({ $push: { comments: req.body } });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a comment

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId) {
      await comment.updateOne({ $set: req.params.id });
      res.status(200).json("the comment has been updated");
    } else {
      res.status(403).json(" you can update only your comments");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a comment

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.body.userId) {
      await comment.deleteOne({ $set: req.body });
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json(" you can delete only your comments");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like a comment
router.put("/:id/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("comment has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//comment a comment
router.put("/comment/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const username = await User.findById(req.body.userId);
    await comment.updateOne({
      $push: {
        comments: {
          userId: req.body.userId,
          comment: req.body.comment,
          username: username.username,
          profilePicture: username.profilePicture,
        },
      },
    });
    res.status(200).json("comment has been commented");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get comments
router.get("/comment/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = await comment.userId;
    const username = user.username;
    res.status(200).json(username);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a comment
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get timeline comments

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userComments = await Comment.find({ userId: currentUser._id });
    const friendComments = await Promise.all(
      currentUser.following.map((friendId) => {
        return Comment.find({ userId: friendId });
      })
    );
    res.status(200).json(userComments.concat(...friendComments));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all comments

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const comments = await Comment.find({ userId: user._id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
