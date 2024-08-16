const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
