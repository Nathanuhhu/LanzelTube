const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const videos = []; // In-memory video store, replace with a database in production

router.post('/upload', upload.single('video'), (req, res) => {
  const video = {
    id: videos.length + 1,
    title: req.body.title,
    description: req.body.description,
    path: req.file.path
  };
  videos.push(video);
  res.status(200).json({ message: 'Video uploaded successfully' });
});

router.get('/:id', (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  if (video) {
    res.sendFile(path.resolve(video.path));
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
});

module.exports = router;

