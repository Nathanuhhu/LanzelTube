const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.uploadVideo = [upload.single('video'), async (req, res) => {
  const { title, description } = req.body;
  const video = new Video({
    title,
    description,
    filePath: '/uploads/' + req.file.filename,
    uploadedBy: req.session.userId
  });
  await video.save();
  res.redirect('/');
}];

exports.getVideos = async (req, res) => {
  const videos = await Video.find().populate('uploadedBy', 'username');
  res.json(videos);
};

exports.getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate('uploadedBy', 'username');
  if (video) {
    res.json(video);
  } else {
    res.status(404).send('Video not found');
  }
};
