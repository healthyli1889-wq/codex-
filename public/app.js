// API base URL
const API_URL = '';

// Load episodes
async function loadEpisodes() {
  try {
    const response = await fetch(`${API_URL}/api/episodes`);
    const episodes = await response.json();

    const grid = document.getElementById('podcast-grid');
    grid.innerHTML = episodes.slice(0, 3).map(episode => `
      <div class="podcast-card">
        <span class="episode-number">EP_${episode.number}</span>
        <h3 class="episode-title">${episode.title}</h3>
        <p class="episode-guest">// ${episode.guest}</p>
        <div class="episode-meta">
          <span class="episode-duration">${episode.duration}</span>
          <div class="play-btn" ${episode.audioUrl ? `onclick="playEpisode('${episode.audioUrl}')"` : ''}>
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading episodes:', error);
  }
}

// Load stats
async function loadStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    const stats = await response.json();

    const statsContainer = document.getElementById('about-stats');
    statsContainer.innerHTML = `
      <div class="stat">
        <div class="stat-value">${stats.subscribers}</div>
        <div class="stat-label">Subscribers</div>
      </div>
      <div class="stat">
        <div class="stat-value">${stats.episodes}</div>
        <div class="stat-label">Episodes</div>
      </div>
      <div class="stat">
        <div class="stat-value">${stats.curiosity}</div>
        <div class="stat-label">Curiosity</div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Handle newsletter subscription
document.getElementById('subscribe-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email')
  };

  const messageDiv = document.getElementById('subscribe-message');

  try {
    const response = await fetch(`${API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      messageDiv.style.display = 'block';
      messageDiv.style.color = 'var(--accent-blue)';
      messageDiv.textContent = '✓ Successfully subscribed! Check your email.';
      e.target.reset();

      // Reload stats
      loadStats();
    } else {
      messageDiv.style.display = 'block';
      messageDiv.style.color = '#ef4444';
      messageDiv.textContent = `✗ ${result.error || 'Subscription failed'}`;
    }
  } catch (error) {
    messageDiv.style.display = 'block';
    messageDiv.style.color = '#ef4444';
    messageDiv.textContent = '✗ Network error. Please try again.';
    console.error('Error subscribing:', error);
  }

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
});

// Play episode (placeholder function)
function playEpisode(audioUrl) {
  if (audioUrl) {
    window.open(audioUrl, '_blank');
  } else {
    alert('Episode coming soon!');
  }
}

// Scroll reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('section:not(.hero)').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadEpisodes();
  loadStats();
});
