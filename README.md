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

This site is configured for easy deployment to multiple platforms. Choose the one that works best for you:

### Deploy to Vercel (Recommended - Easiest!)

**Option 1: Using Vercel Dashboard**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite and configure everything
5. Click "Deploy" - done! Your site will be live in ~1 minute

**Option 2: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Deploy to Netlify

**Option 1: Using Netlify Dashboard**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Netlify will auto-detect the settings
6. Click "Deploy" - done!

**Option 2: Using Netlify CLI**
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

### Deploy to GitHub Pages

**Automated Deployment (Recommended)**

This repo includes a GitHub Actions workflow that automatically deploys to GitHub Pages:

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Push your code to the `main` or `master` branch
4. The workflow will automatically build and deploy your site
5. Your site will be live at `https://yourusername.github.io/codex-/`

**Manual Deployment**
```bash
npm run build
npx gh-pages -d dist
```

### Deploy to Any Static Host

Build the site and upload the `dist/` folder to any static hosting service:

```bash
npm run build
```

Upload the contents of the `dist/` folder to:
- AWS S3 + CloudFront
- Cloudflare Pages
- Firebase Hosting
- Render
- Railway
- etc.

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

## 🔧 Troubleshooting

### Getting a 404 Error After Deployment?

**For Vercel:**
- The `vercel.json` file handles SPA routing automatically
- Make sure you deployed the entire repository, not just the `dist` folder
- Check that Vercel detected your project as a Vite app

**For Netlify:**
- The `_redirects` file in the `public/` folder handles SPA routing
- Verify the file was copied to `dist/` during build
- Check build logs to ensure `npm run build` completed successfully

**For GitHub Pages:**
- Make sure you enabled GitHub Actions in Settings → Pages
- Select "GitHub Actions" as the source (not "Deploy from a branch")
- Check the Actions tab to see if the deployment workflow ran successfully
- Wait a few minutes after the workflow completes for DNS to propagate

**General Debugging:**
1. Run `npm run build` locally and check that the `dist/` folder contains:
   - `index.html`
   - `_redirects` (for Netlify)
   - `404.html` (for GitHub Pages)
   - `assets/` folder with CSS and JS files

2. Test locally with `npm run preview` - if it works locally, it's a deployment config issue

3. Check browser console for errors (press F12)

4. Verify the build command is `npm run build` and output directory is `dist`

### Still Having Issues?

Open an issue on GitHub with:
- Which platform you're deploying to
- Error messages from console/logs
- Steps you followed

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 💡 About

Built with the "vibe coding" philosophy - fast, intuitive, and production-ready from day one. This project showcases how AI-assisted development can create beautiful, functional applications rapidly.

---

**Ready to vibe code?** Start the dev server and make it your own!
