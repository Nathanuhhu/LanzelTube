const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/email');

exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();
  await sendEmail(email, 'Welcome!', 'Thank you for registering!');
  res.redirect('/auth/login');
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
