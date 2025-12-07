import { useState } from 'react'
import './App.css'

function App() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Build production-ready apps in minutes, not weeks'
    },
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'Leverage cutting-edge AI to write clean, efficient code'
    },
    {
      icon: '🚀',
      title: 'Deploy Ready',
      description: 'Ship publish-ready applications from day one'
    },
    {
      icon: '✨',
      title: 'Vibe Coding',
      description: 'Code with intuition, iterate with confidence'
    }
  ]

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">{'</>'}</span>
            <span className="logo-text">Codex</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact" className="cta-button">Get Started</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Vibe Coding Meets
                <span className="gradient-text"> AI Power</span>
              </h1>
              <p className="hero-description">
                Transform your ideas into publish-ready applications with AI-assisted development.
                Fast, intuitive, and production-grade from the first commit.
              </p>
              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Building
                  <span className="button-arrow">{isHovered ? '→' : '→'}</span>
                </button>
                <button className="secondary-button">
                  View Demo
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">10x</div>
                  <div className="stat-label">Faster Development</div>
                </div>
                <div className="stat">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Production Ready</div>
                </div>
                <div className="stat">
                  <div className="stat-value">∞</div>
                  <div className="stat-label">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Why Choose Codex?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <div className="about-content">
              <h2 className="section-title">The Future of Development</h2>
              <p className="about-text">
                Codex combines the power of OpenAI's technology with modern development practices
                to create a seamless coding experience. Write code that feels natural, ships fast,
                and scales effortlessly.
              </p>
              <div className="tech-stack">
                <span className="tech-badge">React</span>
                <span className="tech-badge">Vite</span>
                <span className="tech-badge">OpenAI</span>
                <span className="tech-badge">Modern CSS</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="cta-section">
          <div className="container">
            <h2 className="cta-title">Ready to Start Vibe Coding?</h2>
            <p className="cta-description">Join developers who are building the future, faster.</p>
            <button className="cta-button-large">Get Started Now</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Codex. Powered by AI, built with passion.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
