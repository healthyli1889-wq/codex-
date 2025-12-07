# Codex - Vibe Coding Platform

> OpenAI Codex - Transform your ideas into publish-ready apps with AI-powered development

A modern, AI-assisted coding platform landing page built with React and Vite. Features a stunning UI, smooth animations, and production-ready code from the start.

## 🚀 Live Demo

Deploy this site instantly to see it in action!

## ✨ Features

- **Modern Tech Stack**: Built with React 19, Vite, and modern CSS
- **Responsive Design**: Looks great on all devices
- **Smooth Animations**: Engaging user experience with CSS animations
- **Production Ready**: Optimized build configuration
- **Easy Deployment**: One-click deploy to Vercel, Netlify, or GitHub Pages

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd codex-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect Vite and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Netlify will auto-detect the build settings

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repo name:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

## 🎨 Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... more colors */
}
```

### Content

Update the content in `src/App.jsx`:
- Hero section text
- Features list
- About section
- Call-to-action

## 📁 Project Structure

```
codex-/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel deployment config
└── netlify.toml         # Netlify deployment config
```

## 🧰 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Modern CSS** - Styling with CSS variables and animations
- **No external UI libraries** - Pure, custom components

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 💡 About

Built with the "vibe coding" philosophy - fast, intuitive, and production-ready from day one. This project showcases how AI-assisted development can create beautiful, functional applications rapidly.

---

**Ready to vibe code?** Start the dev server and make it your own!
