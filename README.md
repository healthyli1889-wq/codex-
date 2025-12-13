# Personal Website with CMS

A beautiful, modern personal website with a built-in Content Management System (CMS) for managing your content.

## Features

✨ **Unique Design**
- Watercolor gradient aesthetics
- Smooth animations with Framer Motion
- Responsive design for all devices
- Dark mode support

🎨 **Content Sections**
1. **Product** - Showcase your innovative products and creations
2. **Information Hacker** - Share research work, newsletters, and insights
3. **Find Me!** - Contact page with social links and contact form
4. **Podcast** - Display and manage your podcast episodes
5. **Portfolios** - Welcome visitors to your creative work showcase

📝 **Built-in CMS**
- Easy-to-use admin panel at `/admin`
- Upload and manage content through web interface
- Markdown-based content storage
- File upload support (images, audio, video, PDFs)
- Real-time content updates

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Content:** Markdown with Gray Matter
- **Fonts:** Geist Sans, Geist Mono, Space Grotesk

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Using the CMS

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Select the content type you want to manage
3. Fill in the form and upload files
4. Click "Save Content" to publish

### Content Types

**Products**
- Title
- Description
- Category
- Status
- Image upload

**Articles & Research**
- Title
- Excerpt
- Category
- Full content (Markdown supported)
- Cover image

**Podcast Episodes**
- Title
- Description
- Season & Episode numbers
- Duration
- Audio file upload

**Portfolio Items**
- Title
- Description
- Category
- Year
- Tags
- Project images/videos

### Content Storage

All content is stored as markdown files in the `/content` directory:
- `/content/product/` - Product items
- `/content/article/` - Articles and research
- `/content/podcast/` - Podcast episodes
- `/content/portfolio/` - Portfolio items

Uploaded files are stored in `/public/uploads/`

## Customization

### Colors & Styling

Edit `/app/globals.css` to customize:
- Color scheme (CSS variables in `:root`)
- Gradient effects
- Animations
- Typography

### Content Sections

Modify section pages in `/app/[section]/page.tsx`:
- `/app/product/page.tsx`
- `/app/information-hacker/page.tsx`
- `/app/contact/page.tsx`
- `/app/podcast/page.tsx`
- `/app/portfolios/page.tsx`

### Navigation

Update navigation items in `/components/Navigation.tsx`

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── admin/               # CMS admin panel
│   ├── api/                 # API routes
│   │   └── content/         # Content management API
│   ├── product/             # Product section
│   ├── information-hacker/  # Research & articles section
│   ├── contact/             # Contact page
│   ├── podcast/             # Podcast section
│   ├── portfolios/          # Portfolio section
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navigation.tsx       # Main navigation
│   └── BackgroundBlobs.tsx  # Animated background
├── lib/                     # Utility functions
│   └── content.ts           # Content management utilities
├── content/                 # Markdown content files
│   ├── product/
│   ├── article/
│   ├── podcast/
│   └── portfolio/
└── public/                  # Static assets
    └── uploads/             # User-uploaded files
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted with Docker

## License

MIT License - Feel free to use this for your personal or commercial projects!

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript
