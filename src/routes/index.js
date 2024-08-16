const express = require('express');
const router = express.Router();
const path = require('path');
const videoController = require('../controllers/videoController');

// Home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Upload page
router.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/upload.html'));
});

// Video page
router.get('/video/:id', videoController.getVideoPage);

module.exports = router;
