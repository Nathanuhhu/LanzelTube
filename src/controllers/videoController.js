const path = require('path');

// Simulate a video database
const videos = [
  { id: 1, title: 'Sample Video', description: 'A sample video', filePath: '/uploads/sample.mp4' }
];

exports.getVideoPage = (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find(v => v.id === videoId);
  if (video) {
    res.sendFile(path.join(__dirname, '../../public/video.html'));
  } else {
    res.status(404).send('Video not found');
  }
};
