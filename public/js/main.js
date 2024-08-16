// JavaScript to enhance functionality (e.g., form validation, dynamic content loading)

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript is working');

  // Example: Form validation for upload page
  const uploadForm = document.querySelector('form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', (event) => {
      const title = document.getElementById('title').value;
      const file = document.getElementById('file').files[0];
      if (!title || !file) {
        event.preventDefault();
        alert('Please fill in all fields and select a video file to upload.');
      }
    });
  }
});
