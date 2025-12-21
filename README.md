# Healthy's Newsletter Website

A modern, cyberpunk-themed newsletter website with podcast episodes, content management, and newsletter subscription functionality.

## Features

- 🎨 **Beautiful Cyberpunk Design** - Terminal-style UI with matrix effects
- 📻 **Podcast Management** - Add, edit, and delete podcast episodes with audio uploads
- 📧 **Newsletter Subscriptions** - Collect and manage subscriber emails
- 📊 **Admin Dashboard** - Full-featured admin panel for content management
- 📱 **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express
- **Storage**: JSON files (easily upgradeable to database)
- **File Uploads**: Multer for audio file handling

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 3. Access the Website

- **Main Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## Project Structure

```
.
├── public/              # Frontend files
│   ├── index.html       # Main website
│   ├── styles.css       # Website styles
│   └── app.js          # Frontend JavaScript
├── admin/              # Admin panel
│   ├── index.html       # Admin interface
│   ├── admin-styles.css # Admin styles
│   └── admin.js        # Admin JavaScript
├── server/             # Backend
│   └── index.js        # Express server & API
├── data/               # Data storage
│   ├── episodes.json    # Podcast episodes
│   ├── subscribers.json # Newsletter subscribers
│   └── stats.json      # Statistics
├── uploads/            # Uploaded audio files
└── package.json        # Dependencies
```

## Admin Panel Usage

### Adding a Podcast Episode

1. Go to http://localhost:3000/admin
2. Click "Episodes" in the sidebar
3. Click "+ Add Episode" button
4. Fill in the episode details:
   - Episode Number (e.g., "025")
   - Title
   - Guest name (optional)
   - Duration (e.g., "42:15")
   - Audio file (optional)
5. Click "Save Episode"

### Managing Subscribers

1. Click "Subscribers" in the sidebar
2. View all newsletter subscribers
3. Search subscribers by name or email
4. Delete subscribers if needed

### Viewing Statistics

1. Click "Stats" in the sidebar
2. See total subscribers and episodes

## API Endpoints

### Episodes

- `GET /api/episodes` - Get all episodes
- `GET /api/episodes/:id` - Get single episode
- `POST /api/episodes` - Create new episode
- `PUT /api/episodes/:id` - Update episode
- `DELETE /api/episodes/:id` - Delete episode
- `POST /api/upload/audio` - Upload audio file

### Subscribers

- `GET /api/subscribers` - Get all subscribers
- `POST /api/subscribe` - Subscribe to newsletter
- `DELETE /api/subscribers/:id` - Delete subscriber

### Stats

- `GET /api/stats` - Get statistics

## Customization

### Changing Colors

Edit the CSS variables in `public/styles.css` and `admin/admin-styles.css`:

```css
:root {
    --bg-dark: #0a0a0f;
    --bg-terminal: #0d1117;
    --accent-blue: #00d4ff;
    --accent-dim: #0891b2;
    --text-bright: #e4e4e7;
    --text-dim: #6b7280;
}
```

### Upgrading to Database

The current system uses JSON files for simplicity. To upgrade to a database:

1. Install your preferred database (MongoDB, PostgreSQL, etc.)
2. Replace the `readJSON` and `writeJSON` functions in `server/index.js`
3. Create database models for episodes and subscribers

## Deployment

### Environment Variables

Set `PORT` environment variable for production:

```bash
PORT=8080 npm start
```

### Deploying to Cloud

1. **Vercel/Netlify**: Works with serverless functions
2. **Heroku**: Direct deployment with Procfile
3. **Digital Ocean**: Deploy on droplet with PM2
4. **Railway/Render**: One-click deployment

### Important for Production

- Add authentication to admin panel
- Use a real database instead of JSON files
- Add email service integration (SendGrid, Mailgun)
- Set up SSL/HTTPS
- Add rate limiting for API endpoints

## Development

### Adding New Features

1. Add API endpoint in `server/index.js`
2. Update frontend in `public/app.js`
3. Update admin panel in `admin/admin.js`

### Testing

The system is ready to use! Just start the server and test:

1. Visit the main website
2. Subscribe to newsletter
3. Go to admin panel
4. Add a podcast episode
5. See the episode appear on the main site

## License

MIT License - feel free to use for your own projects!

---

Built with ❤️ by Healthy
