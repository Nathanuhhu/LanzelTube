document.addEventListener('DOMContentLoaded', () => {
  fetch('/videos')
    .then(response => response.json())
    .then(videos => {
      const videosContainer = document.getElementById('videos');
      videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
          <h3>${video.title}</h3>
          <p>${video.description}</p>
          <video src="${video.filePath}" controls width="500"></video>
          <a href="/video.html?id=${video._id}">View Details</a>
        `;
        videosContainer.appendChild(videoElement);
      });
    });
});
