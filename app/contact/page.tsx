'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const socialLinks = [
  { name: 'Twitter', icon: '🐦', href: '#', color: 'from-blue-400 to-blue-600' },
  { name: 'LinkedIn', icon: '💼', href: '#', color: 'from-blue-600 to-blue-800' },
  { name: 'GitHub', icon: '🐙', href: '#', color: 'from-gray-600 to-gray-800' },
  { name: 'Email', icon: '✉️', href: 'mailto:hello@example.com', color: 'from-purple-400 to-pink-600' },
  { name: 'Instagram', icon: '📷', href: '#', color: 'from-pink-500 to-purple-600' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with your backend
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo - integrate with your backend)');
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient font-[var(--font-space-grotesk)]">
            ✧ Find Me!
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Let&apos;s connect and collaborate. I&apos;m always open to new opportunities and conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
              <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
              <h2 className="text-3xl font-bold mb-6">Connect With Me</h2>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r hover:shadow-lg transition-all group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(107, 155, 209, 0.1) 0%, rgba(155, 135, 214, 0.1) 100%)',
                    }}
                  >
                    <span className="text-3xl">{social.icon}</span>
                    <span className="font-semibold group-hover:text-gradient">{social.name}</span>
                    <span className="ml-auto text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl p-8 border border-accent-purple/30">
              <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
              <p className="text-foreground/70 mb-4">
                I typically respond within 24-48 hours. For urgent matters, feel free to reach out via social media.
              </p>
              <div className="flex items-center gap-2 text-sm text-accent-purple">
                <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
                Usually responds in a day
              </div>
            </div>

            {/* Location/Time */}
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50">
              <h3 className="text-2xl font-bold mb-4">Location & Availability</h3>
              <div className="space-y-3 text-foreground/70">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <span>Based in [Your Location]</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <span>Available for collaborations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  <span>Open to new projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
