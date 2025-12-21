const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
app.use('/admin', express.static('admin'));
app.use('/uploads', express.static('uploads'));

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Helper functions to read/write JSON files
const readJSON = async (filename) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', 'data', filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return filename.includes('episodes') ? [] : filename.includes('subscribers') ? [] : {};
  }
};

const writeJSON = async (filename, data) => {
  try {
    await fs.writeFile(
      path.join(__dirname, '..', 'data', filename),
      JSON.stringify(data, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// ===== EPISODES ROUTES =====

// Get all episodes
app.get('/api/episodes', async (req, res) => {
  const episodes = await readJSON('episodes.json');
  res.json(episodes);
});

// Get single episode
app.get('/api/episodes/:id', async (req, res) => {
  const episodes = await readJSON('episodes.json');
  const episode = episodes.find(ep => ep.id === req.params.id);
  if (episode) {
    res.json(episode);
  } else {
    res.status(404).json({ error: 'Episode not found' });
  }
});

// Create new episode
app.post('/api/episodes', async (req, res) => {
  const episodes = await readJSON('episodes.json');
  const newEpisode = {
    id: `ep_${req.body.number}`,
    number: req.body.number,
    title: req.body.title,
    guest: req.body.guest || 'coming soon',
    duration: req.body.duration || '--:--',
    audioUrl: req.body.audioUrl || ''
  };

  episodes.unshift(newEpisode);
  await writeJSON('episodes.json', episodes);

  // Update stats
  const stats = await readJSON('stats.json');
  stats.episodes = episodes.length;
  await writeJSON('stats.json', stats);

  res.json(newEpisode);
});

// Update episode
app.put('/api/episodes/:id', async (req, res) => {
  const episodes = await readJSON('episodes.json');
  const index = episodes.findIndex(ep => ep.id === req.params.id);

  if (index !== -1) {
    episodes[index] = { ...episodes[index], ...req.body };
    await writeJSON('episodes.json', episodes);
    res.json(episodes[index]);
  } else {
    res.status(404).json({ error: 'Episode not found' });
  }
});

// Delete episode
app.delete('/api/episodes/:id', async (req, res) => {
  const episodes = await readJSON('episodes.json');
  const filtered = episodes.filter(ep => ep.id !== req.params.id);

  if (filtered.length < episodes.length) {
    await writeJSON('episodes.json', filtered);

    // Update stats
    const stats = await readJSON('stats.json');
    stats.episodes = filtered.length;
    await writeJSON('stats.json', stats);

    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Episode not found' });
  }
});

// Upload audio file
app.post('/api/upload/audio', upload.single('audio'), (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// ===== NEWSLETTER ROUTES =====

// Get all subscribers
app.get('/api/subscribers', async (req, res) => {
  const subscribers = await readJSON('subscribers.json');
  res.json(subscribers);
});

// Subscribe to newsletter
app.post('/api/subscribe', async (req, res) => {
  const subscribers = await readJSON('subscribers.json');
  const { name, email } = req.body;

  // Check if email already exists
  const exists = subscribers.find(sub => sub.email === email);
  if (exists) {
    return res.status(400).json({ error: 'Email already subscribed' });
  }

  const newSubscriber = {
    id: Date.now().toString(),
    name,
    email,
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);
  await writeJSON('subscribers.json', subscribers);

  // Update stats
  const stats = await readJSON('stats.json');
  stats.subscribers = subscribers.length;
  await writeJSON('stats.json', stats);

  res.json({ success: true, message: 'Successfully subscribed!' });
});

// Delete subscriber
app.delete('/api/subscribers/:id', async (req, res) => {
  const subscribers = await readJSON('subscribers.json');
  const filtered = subscribers.filter(sub => sub.id !== req.params.id);

  if (filtered.length < subscribers.length) {
    await writeJSON('subscribers.json', filtered);

    // Update stats
    const stats = await readJSON('stats.json');
    stats.subscribers = filtered.length;
    await writeJSON('stats.json', stats);

    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Subscriber not found' });
  }
});

// ===== STATS ROUTES =====

// Get stats
app.get('/api/stats', async (req, res) => {
  const stats = await readJSON('stats.json');
  res.json(stats);
});

// ===== SERVER =====

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Healthy's Newsletter Server Running  ║
╠════════════════════════════════════════╣
║  Frontend: http://localhost:${PORT}     ║
║  Admin:    http://localhost:${PORT}/admin ║
║  API:      http://localhost:${PORT}/api    ║
╚════════════════════════════════════════╝
  `);
});
