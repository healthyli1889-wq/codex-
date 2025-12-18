# Installation Instructions

## Prerequisites

- **Browser**: Chrome, Edge, Brave, or any Chromium-based browser
- **API Key**: OpenAI or Anthropic (Claude) account with API access

## Installation Steps

### 1. Get Your API Key

Choose one provider:

#### Option A: OpenAI (Recommended for Beginners)
- Visit: https://platform.openai.com/api-keys
- Create an account (free credits available)
- Generate a new API key
- Copy and save it securely

#### Option B: Anthropic Claude
- Visit: https://console.anthropic.com/
- Create an account
- Generate API key from dashboard
- Copy and save it securely

### 2. Download the Extension

```bash
# Clone from GitHub
git clone https://github.com/yourusername/contentmind-extension.git

# Or download ZIP and extract
```

### 3. Load Extension in Browser

1. **Open Extensions Page**
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. **Enable Developer Mode**
   - Look for toggle switch in top-right corner
   - Turn it ON

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to the `contentmind-extension` folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - Extension icon should appear in toolbar
   - May need to pin it for easy access

### 4. Configure Extension

1. Click the ContentMind icon in your browser toolbar
2. Click the settings (⚙️) icon
3. Enter your configuration:
   - **Provider**: Select OpenAI or Anthropic
   - **API Key**: Paste your API key
   - **Interests**: Describe your learning interests
     - Example: "I'm interested in web development, machine learning, productivity hacks, and entrepreneurship"
4. Click "Save Settings"

### 5. Test It Out!

1. Navigate to YouTube
2. Open any video with captions
3. Click the ContentMind icon
4. Try these features:
   - Generate Summary
   - Create Mindmap
   - Chat with content
   - Analyze Relevance

## Troubleshooting

### Extension Not Loading
- Ensure Developer Mode is enabled
- Check that you selected the correct folder
- Look for error messages in red text
- Try reloading the extension

### "Manifest file is missing or unreadable"
- Make sure you selected the root folder (with manifest.json)
- Don't select a subfolder

### Icons Not Showing
- Chrome/Edge support SVG icons
- If icons don't appear, see assets/ICON_INSTRUCTIONS.md
- Convert SVG to PNG if needed

### API Key Issues
- Verify key is copied correctly (no extra spaces)
- Check that your API account is active
- Ensure you have credits/billing set up

### Content Not Extracting
- Refresh the page after installing
- Make sure you're on a supported platform
- Check browser console for errors (F12)

## Supported Platforms

Currently supported:
- ✅ YouTube
- ✅ Spotify
- ✅ Twitch
- ✅ Vimeo
- ✅ SoundCloud

## Next Steps

- Read QUICK_START.md for usage tips
- See README.md for full documentation
- Check CONTRIBUTING.md if you want to help

## Uninstalling

1. Go to extensions page
2. Find ContentMind
3. Click "Remove"
4. Confirm removal

Note: This only removes the extension. Your API keys are stored locally and will be deleted with the extension.

## Need Help?

- GitHub Issues: Report bugs or ask questions
- Full docs: See README.md
- Quick tips: See QUICK_START.md
