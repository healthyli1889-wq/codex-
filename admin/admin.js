// API base URL
const API_URL = '';

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const section = item.dataset.section;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}-section`).classList.add('active');
  });
});

// ===== EPISODES =====

// Load all episodes
async function loadEpisodes() {
  try {
    const response = await fetch(`${API_URL}/api/episodes`);
    const episodes = await response.json();

    const list = document.getElementById('episodes-list');
    if (episodes.length === 0) {
      list.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 2rem;">No episodes yet. Add your first episode!</p>';
      return;
    }

    list.innerHTML = episodes.map(episode => `
      <div class="episode-card">
        <div class="episode-number">EP_${episode.number}</div>
        <div class="episode-info">
          <h3>${episode.title}</h3>
          <div class="episode-meta">
            Guest: ${episode.guest || 'TBD'} | Duration: ${episode.duration || 'TBD'}
            ${episode.audioUrl ? ` | <a href="${episode.audioUrl}" target="_blank" style="color: var(--accent-blue);">Audio</a>` : ''}
          </div>
        </div>
        <div class="episode-actions">
          <button class="btn btn-danger btn-small" onclick="deleteEpisode('${episode.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading episodes:', error);
  }
}

// Show add episode form
function showAddEpisodeForm() {
  document.getElementById('add-episode-form').style.display = 'block';
}

// Hide add episode form
function hideAddEpisodeForm() {
  document.getElementById('add-episode-form').style.display = 'none';
  document.getElementById('episode-form').reset();
  document.getElementById('upload-status').innerHTML = '';
}

// Handle audio file upload
document.getElementById('audio-file')?.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('audio', file);

  const statusDiv = document.getElementById('upload-status');
  statusDiv.innerHTML = '<span style="color: var(--accent-blue);">Uploading...</span>';

  try {
    const response = await fetch(`${API_URL}/api/upload/audio`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('audio-url').value = result.url;
      statusDiv.innerHTML = '<span style="color: var(--success);">✓ Upload successful</span>';
    } else {
      statusDiv.innerHTML = '<span style="color: var(--danger);">✗ Upload failed</span>';
    }
  } catch (error) {
    statusDiv.innerHTML = '<span style="color: var(--danger);">✗ Upload error</span>';
    console.error('Upload error:', error);
  }
});

// Handle episode form submission
document.getElementById('episode-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    number: formData.get('number'),
    title: formData.get('title'),
    guest: formData.get('guest') || 'coming soon',
    duration: formData.get('duration') || '--:--',
    audioUrl: formData.get('audioUrl') || ''
  };

  try {
    const response = await fetch(`${API_URL}/api/episodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      hideAddEpisodeForm();
      loadEpisodes();
      loadStats();
      alert('Episode added successfully!');
    } else {
      alert('Failed to add episode');
    }
  } catch (error) {
    alert('Error adding episode');
    console.error('Error:', error);
  }
});

// Delete episode
async function deleteEpisode(id) {
  if (!confirm('Are you sure you want to delete this episode?')) return;

  try {
    const response = await fetch(`${API_URL}/api/episodes/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadEpisodes();
      loadStats();
      alert('Episode deleted successfully!');
    } else {
      alert('Failed to delete episode');
    }
  } catch (error) {
    alert('Error deleting episode');
    console.error('Error:', error);
  }
}

// ===== SUBSCRIBERS =====

// Load all subscribers
async function loadSubscribers() {
  try {
    const response = await fetch(`${API_URL}/api/subscribers`);
    const subscribers = await response.json();

    const list = document.getElementById('subscribers-list');

    if (subscribers.length === 0) {
      list.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 2rem;">No subscribers yet.</p>';
      return;
    }

    list.innerHTML = `
      <div class="table-header">
        <div>Name</div>
        <div>Email</div>
        <div>Subscribed At</div>
        <div>Actions</div>
      </div>
      ${subscribers.map(sub => `
        <div class="table-row">
          <div>${sub.name}</div>
          <div>${sub.email}</div>
          <div>${new Date(sub.subscribedAt).toLocaleDateString()}</div>
          <div>
            <button class="btn btn-danger btn-small" onclick="deleteSubscriber('${sub.id}')">Delete</button>
          </div>
        </div>
      `).join('')}
    `;
  } catch (error) {
    console.error('Error loading subscribers:', error);
  }
}

// Delete subscriber
async function deleteSubscriber(id) {
  if (!confirm('Are you sure you want to delete this subscriber?')) return;

  try {
    const response = await fetch(`${API_URL}/api/subscribers/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadSubscribers();
      loadStats();
      alert('Subscriber deleted successfully!');
    } else {
      alert('Failed to delete subscriber');
    }
  } catch (error) {
    alert('Error deleting subscriber');
    console.error('Error:', error);
  }
}

// Search subscribers
document.getElementById('search-subscribers')?.addEventListener('input', async (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const response = await fetch(`${API_URL}/api/subscribers`);
  const subscribers = await response.json();

  const filtered = subscribers.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm) ||
    sub.email.toLowerCase().includes(searchTerm)
  );

  const list = document.getElementById('subscribers-list');

  if (filtered.length === 0) {
    list.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 2rem;">No subscribers found.</p>';
    return;
  }

  list.innerHTML = `
    <div class="table-header">
      <div>Name</div>
      <div>Email</div>
      <div>Subscribed At</div>
      <div>Actions</div>
    </div>
    ${filtered.map(sub => `
      <div class="table-row">
        <div>${sub.name}</div>
        <div>${sub.email}</div>
        <div>${new Date(sub.subscribedAt).toLocaleDateString()}</div>
        <div>
          <button class="btn btn-danger btn-small" onclick="deleteSubscriber('${sub.id}')">Delete</button>
        </div>
      </div>
    `).join('')}
  `;
});

// ===== STATS =====

// Load stats
async function loadStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    const stats = await response.json();

    document.getElementById('total-subscribers').textContent = stats.subscribers;
    document.getElementById('total-episodes').textContent = stats.episodes;
    document.getElementById('growth-rate').textContent = stats.curiosity;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadEpisodes();
  loadSubscribers();
  loadStats();
});
