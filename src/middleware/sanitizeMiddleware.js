const sanitizeHtml = require('sanitize-html');

exports.sanitizeInput = (req, res, next) => {
  req.body = sanitizeHtml(req.body);
  next();
};
