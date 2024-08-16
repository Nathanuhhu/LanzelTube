document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('videoContainer');
  const searchForm = document.getElementById('searchForm');

  // Load videos for the homepage
  if (videoContainer) {
    fetch('/video/list') // Ensure this endpoint returns a list of videos
      .then(response => response.json())
      .then(videos => {
        videoContainer.innerHTML = videos.map(video => `
          <div class="video-thumbnail">
            <a href="/video.html?id=${video.id}">
              <img src="${video.thumbnail}" alt="${video.title}">
              <div class="title">${video.title}</div>
            </a>
          </div>
        `).join('');
      });
  }

  // Handle search
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = document.getElementById('searchQuery').value;
      
      const response = await fetch(`/video/search?query=${query}`);
      const results = await response.json();
      
      // Display search results
      videoContainer.innerHTML = results.map(video => `
        <div class="video-thumbnail">
          <a href="/video.html?id=${video.id}">
            <img src="${video.thumbnail}" alt="${video.title}">
            <div class="title">${video.title}</div>
          </a>
        </div>
      `).join('');
    });
  }
});
