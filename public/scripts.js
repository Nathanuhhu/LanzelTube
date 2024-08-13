
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const commentForm = document.getElementById('commentForm');
  const likeButton = document.getElementById('likeButton');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      alert(data.message);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      alert('Login successful');
      localStorage.setItem('token', data.token);
    });
  }

  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const commentText = document.getElementById('commentText').value;
      const videoId = new URLSearchParams(window.location.search).get('id');
      
      const response = await fetch('/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ videoId, comment: commentText })
      });
      const data = await response.json();
      alert(data.message);
      location.reload();
    });
  }

  if (likeButton) {
    likeButton.addEventListener('click', async () => {
      const videoId = new URLSearchParams(window.location.search).get('id');
      
      const response = await fetch('/comment/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ videoId })
      });
      const data = await response.json();
      document.getElementById('likeCount').textContent = `Likes: ${data.likes}`;
    });
  }

  const videoTitle = document.getElementById('videoTitle');
  const videoSource = document.getElementById('videoSource');
  const commentsDiv = document.getElementById('comments');
  const likeCount = document.getElementById('likeCount');

  if (videoTitle && videoSource) {
    const videoId = new URLSearchParams(window.location.search).get('id');
    
    fetch(`/video/${videoId}`)
      .then(response => response.json())
      .then(video => {
        videoTitle.textContent = video.title;
        videoSource.src = `/${video.path}`;
        videoSource.type = 'video/mp4';
        videoSource.load();
      });

    fetch(`/comment/comments?videoId=${videoId}`)
      .then(response => response.json())
      .then(comments => {
        commentsDiv.innerHTML = comments.map(comment => `<p>${comment.comment}</p>`).join('');
      });

    fetch(`/comment/like?videoId=${videoId}`)
      .then(response => response.json())
      .then(likes => {
        likeCount.textContent = `Likes: ${likes}`;
      });
  }
});
