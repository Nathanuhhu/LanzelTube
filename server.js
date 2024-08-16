const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Routes
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  // Log the file details (you would save this to your database)
  console.log('Title:', title);
  console.log('Description:', description);
  console.log('File Path:', file.path);

  res.redirect('/');
});

// Error handling
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
