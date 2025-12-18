// Content script for detecting and extracting content from video/audio platforms

class PlatformDetector {
  constructor() {
    this.platform = this.detectPlatform();
    this.contentData = null;
  }

  detectPlatform() {
    const hostname = window.location.hostname;

    if (hostname.includes('youtube.com')) return 'youtube';
    if (hostname.includes('spotify.com')) return 'spotify';
    if (hostname.includes('twitch.tv')) return 'twitch';
    if (hostname.includes('vimeo.com')) return 'vimeo';
    if (hostname.includes('soundcloud.com')) return 'soundcloud';

    return 'unknown';
  }

  async extractContent() {
    switch (this.platform) {
      case 'youtube':
        return await this.extractYouTubeContent();
      case 'spotify':
        return await this.extractSpotifyContent();
      case 'twitch':
        return await this.extractTwitchContent();
      case 'vimeo':
        return await this.extractVimeoContent();
      case 'soundcloud':
        return await this.extractSoundCloudContent();
      default:
        return null;
    }
  }

  async extractYouTubeContent() {
    // Wait for video to load
    await this.waitForElement('video');

    const titleElement = document.querySelector('h1.ytd-video-primary-info-renderer, h1.style-scope.ytd-watch-metadata yt-formatted-string');
    const descriptionElement = document.querySelector('#description-inline-expander, ytd-text-inline-expander#description-inline-expander');
    const channelElement = document.querySelector('ytd-channel-name a, #owner-name a');

    // Extract video metadata
    const metadata = {
      platform: 'youtube',
      title: titleElement?.textContent?.trim() || document.title.replace(' - YouTube', ''),
      channel: channelElement?.textContent?.trim() || '',
      description: descriptionElement?.textContent?.trim() || '',
      url: window.location.href,
      videoId: new URLSearchParams(window.location.search).get('v'),
      timestamp: Date.now()
    };

    // Try to get transcript
    metadata.transcript = await this.getYouTubeTranscript();

    return metadata;
  }

  async getYouTubeTranscript() {
    try {
      // Click on "Show transcript" button if available
      const transcriptButtons = document.querySelectorAll('button[aria-label*="transcript" i], button[aria-label*="Transcript" i]');

      for (const button of transcriptButtons) {
        if (button.textContent.includes('Show transcript') || button.getAttribute('aria-label')?.includes('transcript')) {
          button.click();
          await this.sleep(1000);
          break;
        }
      }

      // Wait for transcript panel
      await this.sleep(2000);

      const transcriptSegments = document.querySelectorAll('ytd-transcript-segment-renderer');

      if (transcriptSegments.length === 0) {
        return null;
      }

      const transcript = Array.from(transcriptSegments).map(segment => {
        const timestamp = segment.querySelector('.segment-timestamp')?.textContent?.trim() || '';
        const text = segment.querySelector('.segment-text')?.textContent?.trim() || '';
        return { timestamp, text };
      });

      return transcript;
    } catch (error) {
      console.error('Error extracting YouTube transcript:', error);
      return null;
    }
  }

  async extractSpotifyContent() {
    const titleElement = document.querySelector('h1[data-encore-id="type"]');
    const artistElement = document.querySelector('a[data-encore-id="type"]');

    return {
      platform: 'spotify',
      title: titleElement?.textContent?.trim() || document.title.replace(' - Spotify', ''),
      artist: artistElement?.textContent?.trim() || '',
      url: window.location.href,
      timestamp: Date.now(),
      transcript: null
    };
  }

  async extractTwitchContent() {
    const titleElement = document.querySelector('h2[data-a-target="stream-title"]');
    const channelElement = document.querySelector('a[data-a-target="user-channel-header-item"]');

    return {
      platform: 'twitch',
      title: titleElement?.textContent?.trim() || document.title.replace(' - Twitch', ''),
      channel: channelElement?.textContent?.trim() || '',
      url: window.location.href,
      timestamp: Date.now(),
      transcript: null
    };
  }

  async extractVimeoContent() {
    const titleElement = document.querySelector('.player-title');

    return {
      platform: 'vimeo',
      title: titleElement?.textContent?.trim() || document.title.replace(' on Vimeo', ''),
      url: window.location.href,
      timestamp: Date.now(),
      transcript: null
    };
  }

  async extractSoundCloudContent() {
    const titleElement = document.querySelector('h1[itemprop="name"]');
    const artistElement = document.querySelector('a[itemprop="url"]');

    return {
      platform: 'soundcloud',
      title: titleElement?.textContent?.trim() || document.title.replace(' - SoundCloud', ''),
      artist: artistElement?.textContent?.trim() || '',
      url: window.location.href,
      timestamp: Date.now(),
      transcript: null
    };
  }

  waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async injectFloatingButton() {
    const button = document.createElement('div');
    button.id = 'contentmind-floating-button';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    button.title = 'Open ContentMind';
    document.body.appendChild(button);

    button.addEventListener('click', async () => {
      const content = await this.extractContent();
      chrome.runtime.sendMessage({
        type: 'CONTENT_EXTRACTED',
        data: content
      });
    });
  }
}

// Initialize
const detector = new PlatformDetector();
console.log('ContentMind: Detected platform:', detector.platform);

// Inject floating button
detector.injectFloatingButton();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_CONTENT') {
    detector.extractContent().then(content => {
      sendResponse({ success: true, data: content });
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
});

// Auto-extract content when page loads
setTimeout(async () => {
  try {
    const content = await detector.extractContent();
    if (content) {
      chrome.storage.local.set({
        [`content_${content.platform}_${Date.now()}`]: content,
        lastContent: content
      });
    }
  } catch (error) {
    console.error('ContentMind: Error auto-extracting content:', error);
  }
}, 3000);
