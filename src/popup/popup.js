// Popup UI Controller

class PopupController {
  constructor() {
    this.currentContent = null;
    this.currentTab = 'summary';
    this.chatHistory = [];

    this.init();
  }

  async init() {
    this.setupTabs();
    this.setupButtons();
    this.setupChat();
    this.setupSettings();
    await this.loadLastContent();
  }

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');

    this.currentTab = tabName;
  }

  setupButtons() {
    // Summary buttons
    document.getElementById('generateSummaryBtn').addEventListener('click', () => {
      this.generateSummary();
    });
    document.getElementById('regenerateSummaryBtn')?.addEventListener('click', () => {
      this.generateSummary();
    });

    // Mindmap buttons
    document.getElementById('generateMindmapBtn').addEventListener('click', () => {
      this.generateMindmap();
    });
    document.getElementById('regenerateMindmapBtn')?.addEventListener('click', () => {
      this.generateMindmap();
    });

    // Relevance buttons
    document.getElementById('analyzeRelevanceBtn').addEventListener('click', () => {
      this.analyzeRelevance();
    });
    document.getElementById('regenerateRelevanceBtn')?.addEventListener('click', () => {
      this.analyzeRelevance();
    });
  }

  setupChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message && this.currentContent) {
        this.sendChatMessage(message);
        chatInput.value = '';
      }
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  setupSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');

    settingsBtn.addEventListener('click', async () => {
      await this.openSettings();
    });

    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.classList.add('hidden');
    });

    saveSettingsBtn.addEventListener('click', async () => {
      await this.saveSettings();
    });

    // Close on background click
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
      }
    });
  }

  async openSettings() {
    const config = await chrome.storage.local.get(['apiKey', 'provider', 'userPreferences']);

    document.getElementById('providerSelect').value = config.provider || 'openai';
    document.getElementById('apiKeyInput').value = config.apiKey || '';
    document.getElementById('userPreferencesInput').value = config.userPreferences || '';

    document.getElementById('settingsModal').classList.remove('hidden');
  }

  async saveSettings() {
    const provider = document.getElementById('providerSelect').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    const userPreferences = document.getElementById('userPreferencesInput').value;

    await chrome.storage.local.set({ provider, apiKey, userPreferences });

    // Notify background script of config update
    chrome.runtime.sendMessage({ type: 'UPDATE_CONFIG' });

    document.getElementById('settingsModal').classList.add('hidden');
    this.showNotification('Settings saved successfully!');
  }

  async loadLastContent() {
    try {
      // Get content from current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab) return;

      chrome.tabs.sendMessage(tab.id, { type: 'GET_CONTENT' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Content script not ready yet');
          return;
        }

        if (response && response.success) {
          this.currentContent = response.data;
          console.log('Loaded content:', this.currentContent);
        }
      });
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  async generateSummary() {
    if (!this.currentContent) {
      await this.loadLastContent();

      if (!this.currentContent) {
        this.showNotification('Please navigate to a video or audio page first');
        return;
      }
    }

    this.showLoading('summary');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GENERATE_SUMMARY',
        content: this.currentContent
      });

      if (response.error) {
        this.showError('summary', response.error);
        return;
      }

      this.displaySummary(response);
    } catch (error) {
      this.showError('summary', error.message);
    }
  }

  displaySummary(data) {
    this.hideLoading('summary');

    document.getElementById('summaryEmpty').classList.add('hidden');
    document.getElementById('summaryContent').classList.remove('hidden');

    document.getElementById('summaryTitle').textContent = this.currentContent.title;
    document.getElementById('summaryMeta').textContent =
      `${this.currentContent.platform} • ${this.currentContent.channel || this.currentContent.artist || ''}`;
    document.getElementById('summaryText').textContent = data.summary;
  }

  async generateMindmap() {
    if (!this.currentContent) {
      await this.loadLastContent();

      if (!this.currentContent) {
        this.showNotification('Please navigate to a video or audio page first');
        return;
      }
    }

    this.showLoading('mindmap');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GENERATE_MINDMAP',
        content: this.currentContent
      });

      if (response.error) {
        this.showError('mindmap', response.error);
        return;
      }

      this.displayMindmap(response.mindmap);
    } catch (error) {
      this.showError('mindmap', error.message);
    }
  }

  displayMindmap(mindmapData) {
    this.hideLoading('mindmap');

    document.getElementById('mindmapEmpty').classList.add('hidden');
    document.getElementById('mindmapContent').classList.remove('hidden');

    const viz = document.getElementById('mindmapViz');
    viz.innerHTML = '';

    // Central node
    const centralNode = document.createElement('div');
    centralNode.className = 'mindmap-node mindmap-central';
    centralNode.textContent = mindmapData.central;
    viz.appendChild(centralNode);

    // Branches
    mindmapData.branches.forEach(branch => {
      const branchNode = document.createElement('div');
      branchNode.className = 'mindmap-node mindmap-branch';
      branchNode.textContent = branch.title;
      viz.appendChild(branchNode);

      if (branch.children) {
        branch.children.forEach(child => {
          if (typeof child === 'string') {
            const leafNode = document.createElement('div');
            leafNode.className = 'mindmap-node mindmap-leaf';
            leafNode.textContent = child;
            viz.appendChild(leafNode);
          } else if (child.title) {
            const subNode = document.createElement('div');
            subNode.className = 'mindmap-node mindmap-subbranch';
            subNode.textContent = child.title;
            viz.appendChild(subNode);

            if (child.children && Array.isArray(child.children)) {
              child.children.forEach(leaf => {
                const leafNode = document.createElement('div');
                leafNode.className = 'mindmap-node mindmap-leaf';
                leafNode.textContent = typeof leaf === 'string' ? leaf : leaf.title || '';
                viz.appendChild(leafNode);
              });
            }
          }
        });
      }
    });
  }

  async sendChatMessage(message) {
    if (!this.currentContent) {
      this.showNotification('Please load content first');
      return;
    }

    // Hide empty state
    document.getElementById('chatEmpty').classList.add('hidden');

    // Add user message
    this.addChatMessage('user', message);

    // Show loading
    const loadingId = this.addChatMessage('assistant', 'Thinking...');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'CHAT',
        message: message,
        context: this.currentContent
      });

      // Remove loading message
      document.getElementById(loadingId)?.remove();

      if (response.error) {
        this.addChatMessage('assistant', `Error: ${response.error}`);
        return;
      }

      this.addChatMessage('assistant', response.response);
      this.chatHistory.push({ user: message, assistant: response.response });
    } catch (error) {
      document.getElementById(loadingId)?.remove();
      this.addChatMessage('assistant', `Error: ${error.message}`);
    }
  }

  addChatMessage(role, text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageId = `msg-${Date.now()}-${Math.random()}`;

    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `chat-message message-${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return messageId;
  }

  async analyzeRelevance() {
    if (!this.currentContent) {
      await this.loadLastContent();

      if (!this.currentContent) {
        this.showNotification('Please navigate to a video or audio page first');
        return;
      }
    }

    const config = await chrome.storage.local.get(['userPreferences']);
    const preferences = config.userPreferences || '';

    if (!preferences) {
      this.showNotification('Please set your interests in Settings first');
      setTimeout(() => this.openSettings(), 500);
      return;
    }

    this.showLoading('relevance');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ANALYZE_RELEVANCE',
        content: this.currentContent,
        preferences: { interests: preferences }
      });

      if (response.error) {
        this.showError('relevance', response.error);
        return;
      }

      this.displayRelevance(response);
    } catch (error) {
      this.showError('relevance', error.message);
    }
  }

  displayRelevance(data) {
    this.hideLoading('relevance');

    document.getElementById('relevanceEmpty').classList.add('hidden');
    document.getElementById('relevanceContent').classList.remove('hidden');

    // Animate score circle
    const score = data.relevanceScore || 0;
    const circle = document.getElementById('scoreCircleProgress');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    // Update score color
    if (score >= 75) {
      circle.style.stroke = '#4CAF50';
    } else if (score >= 50) {
      circle.style.stroke = '#FFC107';
    } else {
      circle.style.stroke = '#FF5722';
    }

    document.getElementById('scoreValue').textContent = score;

    // Display matching topics
    const topicsContainer = document.getElementById('matchingTopics');
    topicsContainer.innerHTML = '';

    if (data.matchingTopics && data.matchingTopics.length > 0) {
      data.matchingTopics.forEach(topic => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = topic;
        topicsContainer.appendChild(tag);
      });
    } else {
      topicsContainer.innerHTML = '<span class="tag">No matching topics</span>';
    }

    document.getElementById('relevanceAnalysis').textContent = data.analysis || 'No analysis available';
    document.getElementById('recommendedFor').textContent = data.recommendedFor || 'General audience';
  }

  showLoading(section) {
    document.getElementById(`${section}Loading`).classList.remove('hidden');
    document.getElementById(`${section}Empty`).classList.add('hidden');
    document.getElementById(`${section}Content`).classList.add('hidden');
  }

  hideLoading(section) {
    document.getElementById(`${section}Loading`).classList.add('hidden');
  }

  showError(section, message) {
    this.hideLoading(section);
    this.showNotification(`Error: ${message}`);

    // Show settings if API key is missing
    if (message.includes('API key')) {
      setTimeout(() => this.openSettings(), 1000);
    }
  }

  showNotification(message) {
    // Simple notification using alert for now
    // Could be replaced with a custom toast notification
    alert(message);
  }
}

// Initialize popup
const popup = new PopupController();
