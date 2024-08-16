const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;
  await User.findByIdAndUpdate(req.session.userId, { username, email });
  res.redirect('/profiles');
};
