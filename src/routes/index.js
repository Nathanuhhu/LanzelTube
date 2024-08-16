const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./auth');
const videoRoutes = require('./video');
const commentRoutes = require('./comment');

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
