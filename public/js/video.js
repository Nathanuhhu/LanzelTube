document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  
  fetch(`/videos/${videoId}`)
    .then(response => response.json())
    .then(video => {
      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = `
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <video src="${video.filePath}" controls width="800"></video>
      `;
    });

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = document.getElementById('comment-text').value;

    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ videoId, text: commentText })
    }).then(response => response.json())
      .then(comment => {
        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML += `
          <div>
            <p>${comment.text}</p>
            <p>Posted by: ${comment.postedBy.username}</p>
          </div>
        `;
      });
  });

  fetch(`/comments/${videoId}`)
    .then(response => response.json())
    .then(comments => {
      const commentsContainer = document.getElementById('comments');
      comments.forEach(comment => {
        commentsContainer.innerHTML += `
          <div>
            <p>${comment.text}</p>
            <p>Posted by: ${comment.postedBy.username}</p>
          </div>
        `;
      });
    });
});
