'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample research/blog data - will be replaced with CMS content
const articles = [
  {
    id: 1,
    title: 'The Future of Digital Innovation',
    excerpt: 'Exploring emerging trends and technologies shaping our digital landscape.',
    date: '2024-12-10',
    category: 'Research',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Insights on Creative Processes',
    excerpt: 'Understanding the psychology behind creative breakthroughs and innovation.',
    date: '2024-12-05',
    category: 'Newsletter',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Data-Driven Decision Making',
    excerpt: 'How to leverage data analytics for better strategic decisions.',
    date: '2024-11-28',
    category: 'Research',
    readTime: '12 min read',
  },
];

export default function InformationHackerPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient font-[var(--font-space-grotesk)]">
            ◆ Information Hacker
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Deep dives into research, insights, and thoughts on technology, creativity, and innovation.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['All', 'Research', 'Newsletter', 'Insights'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all"
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Articles List */}
        <div className="space-y-6 mb-16">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all hover:shadow-xl hover:shadow-accent-purple/10"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-sm bg-accent-purple/20 text-accent-purple rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-foreground/50">{article.date}</span>
                  <span className="text-sm text-foreground/50">• {article.readTime}</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-3 group-hover:text-gradient transition-all cursor-pointer">
                {article.title}
              </h2>

              <p className="text-lg text-foreground/60 mb-6">
                {article.excerpt}
              </p>

              <button className="flex items-center gap-2 text-accent-purple font-semibold group-hover:gap-4 transition-all">
                Read Article
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl p-12 text-center border border-accent-purple/30"
        >
          <h3 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h3>
          <p className="text-lg text-foreground/70 mb-6 max-w-xl mx-auto">
            Get the latest insights, research, and updates delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-accent-purple/50 transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* CMS Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center p-8 bg-accent-blue/10 rounded-3xl border border-accent-blue/20 mt-8"
        >
          <p className="text-lg text-foreground/70">
            📝 <strong>Content Management:</strong> Add and manage your articles through the{' '}
            <Link href="/admin" className="text-accent-purple hover:underline font-semibold">
              Admin Panel
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
