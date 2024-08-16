const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const videoRouter = require('./src/routes/videoRoutes');
const authRouter = require('./src/routes/authRoutes');
const commentRouter = require('./src/routes/commentRoutes');
const profileRouter = require('./src/routes/profileRoutes');
const { ensureAuthenticated } = require('./src/middleware/authMiddleware');
const { csrfProtection } = require('./src/middleware/csrfMiddleware');
const { sanitizeInput } = require('./src/middleware/sanitizeMiddleware');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true }
}));
app.use(csrf());
app.use(helmet()); // Security headers
app.use(sanitizeInput); // Input sanitization

// Routes
app.use('/videos', ensureAuthenticated, videoRouter);
app.use('/auth', authRouter);
app.use('/comments', ensureAuthenticated, commentRouter);
app.use('/profiles', ensureAuthenticated, profileRouter);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
