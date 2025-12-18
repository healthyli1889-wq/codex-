// Background service worker for AI processing

class AIProcessor {
  constructor() {
    this.apiKey = null;
    this.provider = 'openai'; // or 'anthropic'
  }

  async initialize() {
    const config = await chrome.storage.local.get(['apiKey', 'provider']);
    this.apiKey = config.apiKey || null;
    this.provider = config.provider || 'openai';
  }

  async generateSummary(content) {
    if (!this.apiKey) {
      return {
        error: 'API key not configured. Please add your OpenAI or Anthropic API key in settings.'
      };
    }

    const text = this.prepareTextForSummary(content);

    if (this.provider === 'openai') {
      return await this.generateSummaryOpenAI(text, content);
    } else {
      return await this.generateSummaryClaude(text, content);
    }
  }

  prepareTextForSummary(content) {
    let text = `Title: ${content.title}\n`;

    if (content.channel) text += `Channel: ${content.channel}\n`;
    if (content.artist) text += `Artist: ${content.artist}\n`;
    if (content.description) text += `Description: ${content.description}\n\n`;

    if (content.transcript && Array.isArray(content.transcript)) {
      text += 'Transcript:\n';
      text += content.transcript.map(seg => seg.text).join(' ');
    }

    return text;
  }

  async generateSummaryOpenAI(text, content) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that creates concise, informative summaries of video and audio content.'
            },
            {
              role: 'user',
              content: `Please provide a comprehensive summary of the following content. Include:\n1. Main topics and key points (3-5 bullet points)\n2. Key takeaways\n3. Notable quotes or insights\n\nContent:\n${text}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        summary: data.choices[0].message.content,
        provider: 'openai',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating summary with OpenAI:', error);
      return { error: error.message };
    }
  }

  async generateSummaryClaude(text, content) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Please provide a comprehensive summary of the following content. Include:\n1. Main topics and key points (3-5 bullet points)\n2. Key takeaways\n3. Notable quotes or insights\n\nContent:\n${text}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        summary: data.content[0].text,
        provider: 'anthropic',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating summary with Claude:', error);
      return { error: error.message };
    }
  }

  async generateMindmap(content) {
    if (!this.apiKey) {
      return {
        error: 'API key not configured. Please add your OpenAI or Anthropic API key in settings.'
      };
    }

    const text = this.prepareTextForSummary(content);

    const prompt = `Based on the following content, create a hierarchical mindmap structure in JSON format. The mindmap should have:
- A central topic (root node)
- Main branches (2-5 major themes)
- Sub-branches (2-4 key points per main branch)
- Leaf nodes (specific details or examples)

Return ONLY a JSON object with this structure:
{
  "central": "Main Topic",
  "branches": [
    {
      "title": "Branch 1",
      "children": [
        {
          "title": "Sub-topic 1.1",
          "children": ["Detail 1", "Detail 2"]
        }
      ]
    }
  ]
}

Content:\n${text}`;

    try {
      let mindmapData;

      if (this.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a helpful assistant that creates structured mindmaps in JSON format.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        mindmapData = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      } else {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.content[0].text;
        mindmapData = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      }

      return {
        mindmap: mindmapData,
        provider: this.provider,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating mindmap:', error);
      return { error: error.message };
    }
  }

  async chat(message, context) {
    if (!this.apiKey) {
      return {
        error: 'API key not configured. Please add your OpenAI or Anthropic API key in settings.'
      };
    }

    const contextText = this.prepareTextForSummary(context);
    const systemPrompt = `You are a helpful assistant that answers questions about video and audio content. Use the following content as context to answer user questions accurately and concisely.\n\nContext:\n${contextText}`;

    try {
      if (this.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 800
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          response: data.choices[0].message.content,
          provider: 'openai',
          timestamp: Date.now()
        };
      } else {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [
              { role: 'user', content: `${systemPrompt}\n\nUser question: ${message}` }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          response: data.content[0].text,
          provider: 'anthropic',
          timestamp: Date.now()
        };
      }
    } catch (error) {
      console.error('Error in chat:', error);
      return { error: error.message };
    }
  }

  async analyzeRelevance(content, userPreferences) {
    if (!this.apiKey) {
      return {
        error: 'API key not configured.',
        relevanceScore: 0
      };
    }

    const contentText = this.prepareTextForSummary(content);
    const preferencesText = JSON.stringify(userPreferences, null, 2);

    const prompt = `Analyze how relevant this content is to the user's preferences and needs. Provide:
1. Relevance score (0-100)
2. Matching topics
3. Why this content is/isn't relevant
4. Recommended for: (who would benefit most)

User Preferences:
${preferencesText}

Content:
${contentText}

Return a JSON object with: { "relevanceScore": number, "matchingTopics": [], "analysis": "", "recommendedFor": "" }`;

    try {
      let result;

      if (this.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You analyze content relevance and return structured JSON.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 600
          })
        });

        const data = await response.json();
        const content = data.choices[0].message.content;
        result = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      } else {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        const data = await response.json();
        const content = data.content[0].text;
        result = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      }

      return {
        ...result,
        provider: this.provider,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error analyzing relevance:', error);
      return {
        error: error.message,
        relevanceScore: 0
      };
    }
  }
}

// Initialize processor
const processor = new AIProcessor();
processor.initialize();

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GENERATE_SUMMARY') {
    processor.generateSummary(request.content).then(sendResponse);
    return true;
  }

  if (request.type === 'GENERATE_MINDMAP') {
    processor.generateMindmap(request.content).then(sendResponse);
    return true;
  }

  if (request.type === 'CHAT') {
    processor.chat(request.message, request.context).then(sendResponse);
    return true;
  }

  if (request.type === 'ANALYZE_RELEVANCE') {
    processor.analyzeRelevance(request.content, request.preferences).then(sendResponse);
    return true;
  }

  if (request.type === 'UPDATE_CONFIG') {
    processor.initialize().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Log extension loaded
console.log('ContentMind service worker loaded');
