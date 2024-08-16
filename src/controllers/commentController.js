const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { videoId, text } = req.body;
  const comment = new Comment({
    text,
    video: videoId,
    postedBy: req.session.userId
  });
  await comment.save();
  res.redirect(`/videos/${videoId}`);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId }).populate('postedBy', 'username');
  res.json(comments);
};
