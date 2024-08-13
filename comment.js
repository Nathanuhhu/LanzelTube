const express = require('express');
const router = express.Router();

let comments = [];
let likes = {};

router.post('/add', (req, res) => {
  const { videoId, comment } = req.body;
  comments.push({ videoId, comment });
  res.status(200).json({ message: 'Comment added' });
});

router.post('/like', (req, res) => {
  const { videoId } = req.body;
  likes[videoId] = (likes[videoId] || 0) + 1;
  res.status(200).json({ likes: likes[videoId] });
});

router.get('/comments', (req, res) => {
  const { videoId } = req.query;
  const videoComments = comments.filter(c => c.videoId == videoId);
  res.json(videoComments);
});

module.exports = router;

