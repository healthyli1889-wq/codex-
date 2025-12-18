# ContentMind - Smart Video & Audio Assistant 🎥🎧

An intelligent browser extension that transforms how you consume audio and video content on platforms like YouTube, Spotify, Twitch, Vimeo, and SoundCloud. Get instant summaries, mindmaps, chat with content, and personalized relevance scoring.

## 🌟 Features

### 1. **Content Summarization**
- Generates concise, informative summaries of videos and audio content
- Extracts key points, takeaways, and notable quotes
- Works with video transcripts when available
- Saves time by giving you the essence of content in seconds

### 2. **Mindmap Visualization**
- Creates hierarchical mindmaps from content
- Organizes information into central topics, branches, and sub-topics
- Visual representation helps with understanding and retention
- Perfect for educational content and complex topics

### 3. **Intelligent Chat Interface**
- Ask questions about the content without watching/listening to the entire thing
- Get specific answers based on the actual content
- No need for external apps like Recall or separate AI tools
- Context-aware responses that reference the source material

### 4. **Personalized Relevance Analysis**
- Instantly see how relevant content is to YOUR interests and goals
- Get a relevance score (0-100) based on your preferences
- See matching topics and why the content is relevant
- Make quick decisions about whether content is worth your time

## 🚀 Installation

### Prerequisites
- Chrome, Edge, or any Chromium-based browser
- OpenAI API key OR Anthropic (Claude) API key

### Step 1: Get Your API Key

**Option A: OpenAI (Recommended for beginners)**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

**Option B: Anthropic (Claude)**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy the key

### Step 2: Install the Extension

1. **Download or clone this repository**
   ```bash
   git clone https://github.com/yourusername/contentmind-extension.git
   cd contentmind-extension
   ```

2. **Open your browser's extension page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `contentmind-extension` folder
   - The ContentMind icon should appear in your toolbar

### Step 3: Configure the Extension

1. Click the ContentMind icon in your browser toolbar
2. Click the settings icon (gear) in the top-right
3. Select your AI provider (OpenAI or Anthropic)
4. Paste your API key
5. Add your interests and goals in the "Your Interests & Goals" field
   - Example: "I'm interested in web development, AI/ML, productivity, and learning about startups"
6. Click "Save Settings"

## 📖 Usage

### Basic Workflow

1. **Navigate to a supported platform**
   - YouTube (videos)
   - Spotify (podcasts, music)
   - Twitch (streams)
   - Vimeo (videos)
   - SoundCloud (audio)

2. **Open a video or audio content page**

3. **Click the ContentMind extension icon** or use the floating button (bottom-right)

4. **Choose your feature:**

#### Get a Summary
1. Click the "Summary" tab
2. Click "Generate Summary"
3. Wait a few seconds for AI processing
4. Read the comprehensive summary with key points and takeaways

#### View a Mindmap
1. Click the "Mindmap" tab
2. Click "Generate Mindmap"
3. Explore the hierarchical structure of the content
4. See how topics and subtopics relate to each other

#### Chat with Content
1. Click the "Chat" tab
2. Type your question in the input field
3. Press Enter or click Send
4. Get answers based on the actual content

Example questions:
- "What are the main arguments presented?"
- "Can you explain the concept mentioned at 10:30?"
- "What tools or resources were recommended?"
- "Summarize the conclusions"

#### Check Relevance
1. Click the "Relevance" tab
2. Click "Analyze Relevance"
3. See your personalized relevance score (0-100)
4. View matching topics and analysis
5. Understand who this content is recommended for

### Tips for Best Results

**For YouTube Videos:**
- The extension works best with videos that have transcripts/captions
- Longer, more detailed content produces richer summaries and mindmaps
- Educational content works particularly well

**For Other Platforms:**
- Some platforms may have limited metadata available
- The extension will still work but may rely more on titles and descriptions
- Transcript extraction varies by platform

**For Personalization:**
- Be specific about your interests in settings
- Update your preferences as your goals change
- More detailed preferences = better relevance analysis

## 🔧 Technical Details

### Supported Platforms
- ✅ YouTube (full transcript support)
- ✅ Spotify
- ✅ Twitch
- ✅ Vimeo
- ✅ SoundCloud

### AI Models Used
- **OpenAI**: GPT-4o-mini (fast, cost-effective)
- **Anthropic**: Claude 3.5 Sonnet (high-quality, nuanced)

### Architecture
```
contentmind-extension/
├── manifest.json           # Extension configuration
├── src/
│   ├── content/           # Content scripts (run on web pages)
│   │   └── content-script.js
│   ├── background/        # Background service worker
│   │   └── service-worker.js
│   ├── popup/            # Extension popup UI
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── styles/
│       └── content.css   # Styles for floating button
└── assets/               # Icons and images
```

### Data Privacy

**Your data is private and secure:**
- API keys are stored locally in your browser
- Content is only sent to your chosen AI provider (OpenAI or Anthropic)
- No data is sent to any third-party servers
- No tracking or analytics
- All processing happens between your browser and the AI provider

### Cost Considerations

**API Usage Costs:**
- OpenAI GPT-4o-mini: ~$0.01 per video summary
- Anthropic Claude: ~$0.02 per video summary
- Typical monthly usage: $1-5 depending on how much you use it

Both providers offer free credits for new users!

## 🛠️ Development

### Prerequisites
- Node.js (optional, for future build tools)
- Basic knowledge of JavaScript, HTML, CSS

### Project Structure
- `manifest.json`: Extension configuration and permissions
- `src/content/`: Scripts that run on video/audio platform pages
- `src/background/`: Service worker for AI processing
- `src/popup/`: Extension UI (HTML, CSS, JS)

### Adding New Platforms

To add support for a new platform:

1. **Update `manifest.json`**:
   ```json
   "content_scripts": [{
     "matches": ["https://newplatform.com/*"],
     ...
   }]
   ```

2. **Add extraction logic in `content-script.js`**:
   ```javascript
   async extractNewPlatformContent() {
     // Extract title, description, transcript, etc.
     return {
       platform: 'newplatform',
       title: '...',
       // ...
     };
   }
   ```

3. **Update the detector**:
   ```javascript
   detectPlatform() {
     if (hostname.includes('newplatform.com')) return 'newplatform';
     // ...
   }
   ```

## 🤝 Contributing

Contributions are welcome! Here are ways you can help:

1. **Report bugs**: Open an issue with details
2. **Suggest features**: Share your ideas
3. **Improve code**: Submit pull requests
4. **Add platform support**: Help extend to more platforms
5. **Improve documentation**: Fix typos, add examples

## 📝 Roadmap

### Coming Soon
- [ ] Export summaries to Notion, Obsidian, or Markdown
- [ ] Timestamp-linked navigation (jump to specific points in videos)
- [ ] Multi-language support
- [ ] Browser history of analyzed content
- [ ] Offline mode with local AI models
- [ ] Browser sync across devices
- [ ] Custom prompt templates
- [ ] Collaborative annotations

### Future Ideas
- [ ] Integration with note-taking apps
- [ ] Playlist analysis and recommendations
- [ ] Learning path generation from multiple videos
- [ ] Flashcard generation for studying
- [ ] Social sharing of summaries

## ❓ FAQ

**Q: Why do I need an API key?**
A: The extension uses AI models to analyze content. The API key allows the extension to securely communicate with AI providers.

**Q: Is my data private?**
A: Yes! Data is only sent to your chosen AI provider. Nothing is stored on external servers.

**Q: Does this work offline?**
A: Not yet. The extension requires an internet connection to communicate with AI APIs. Offline support is planned.

**Q: Which AI provider should I choose?**
A: Both work great! OpenAI is slightly cheaper and faster. Claude provides more nuanced analysis. Try both!

**Q: Can I use this on mobile?**
A: Not currently. This is a desktop browser extension for Chrome/Edge. Mobile support may come in the future.

**Q: The extension isn't working on a video. Why?**
A: Make sure:
- You've configured your API key in settings
- You're on a supported platform
- The page has fully loaded
- For YouTube, the video has captions/transcripts available

**Q: How much does it cost?**
A: The extension is free. You only pay for AI API usage (typically $1-5/month for moderate use).

## 🐛 Troubleshooting

### Extension not appearing
- Make sure Developer Mode is enabled
- Try reloading the extension
- Check browser console for errors

### "API key not configured" error
- Open Settings and add your API key
- Make sure you've selected the correct provider
- Verify your API key is valid

### No content detected
- Make sure you're on a supported platform
- Refresh the page and wait for it to fully load
- Click the floating button to manually trigger extraction

### Transcript not found (YouTube)
- Not all videos have transcripts
- Try videos with closed captions
- The extension will work with title/description if no transcript available

### Slow performance
- Large transcripts take longer to process
- Try shorter videos first
- Consider using GPT-4o-mini for faster results

## 📄 License

MIT License - feel free to use, modify, and distribute!

## 🙏 Acknowledgments

- Built with vanilla JavaScript (no frameworks!)
- Icons from Heroicons
- Inspired by tools like Recall, Glasp, and YouTube Summary with ChatGPT
- Thanks to OpenAI and Anthropic for their amazing AI APIs

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/contentmind-extension/issues)
- **Email**: your-email@example.com
- **Twitter**: @yourhandle

---

Made with ❤️ for better learning and productivity

**Star this repo if you find it useful!** ⭐
