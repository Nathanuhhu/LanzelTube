const express = require('express');
const router = express.Router();

// Example data
const videos = [
  { id: '1', title: 'Sample Video', thumbnail: '/images/sample.jpg' }
];

router.get('/list', (req, res) => {
  res.json(videos);
});

router.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = videos.filter(video => video.title.toLowerCase().includes(query));
  res.json(results);
});

module.exports = router;
