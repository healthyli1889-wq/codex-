'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample portfolio items - will be replaced with CMS content
const portfolioItems = [
  {
    id: 1,
    title: 'Visual Observation Diary',
    description: 'A multimedia exploration of everyday moments through film and photography.',
    category: 'Film & Photography',
    year: '2024',
    image: '/images/portfolio-placeholder.jpg',
    tags: ['Documentary', 'Visual Art', 'Storytelling'],
  },
  {
    id: 2,
    title: 'Digital Innovation Project',
    description: 'Creating immersive digital experiences that push creative boundaries.',
    category: 'Digital Art',
    year: '2024',
    image: '/images/portfolio-placeholder.jpg',
    tags: ['Interactive', 'Web Design', 'UI/UX'],
  },
  {
    id: 3,
    title: 'Creative Technology Series',
    description: 'Merging technology with artistic expression in unexpected ways.',
    category: 'Mixed Media',
    year: '2023',
    image: '/images/portfolio-placeholder.jpg',
    tags: ['Experimental', 'Technology', 'Art'],
  },
  {
    id: 4,
    title: 'Urban Landscapes',
    description: 'Capturing the essence of modern cities through a creative lens.',
    category: 'Photography',
    year: '2023',
    image: '/images/portfolio-placeholder.jpg',
    tags: ['Photography', 'Urban', 'Documentary'],
  },
];

const categories = ['All', 'Film & Photography', 'Digital Art', 'Mixed Media', 'Photography'];

export default function PortfoliosPage() {
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
            ◇ Welcome to My Creation Space
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A curated collection of my creative work, experiments, and artistic endeavors.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all font-medium"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all hover:shadow-2xl hover:shadow-accent-purple/20"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink opacity-30 group-hover:opacity-40 transition-opacity relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">
                    {item.category.includes('Film') ? '🎬' :
                     item.category.includes('Digital') ? '💻' :
                     item.category.includes('Photography') ? '📷' : '🎨'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-accent-purple/20 text-accent-purple rounded-full">
                    {item.category}
                  </span>
                  <span className="px-3 py-1 text-xs bg-accent-teal/20 text-accent-teal rounded-full">
                    {item.year}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {item.title}
                </h3>
                <p className="text-foreground/60 mb-6">
                  {item.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-foreground/50 border border-foreground/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button className="flex items-center gap-2 text-accent-purple font-semibold group-hover:gap-4 transition-all">
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl p-12 mb-16 border border-accent-purple/30 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Each project represents a unique journey of exploration, creativity, and innovation. Click on any project to dive deeper into the creative process.
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">25+</div>
              <div className="text-sm text-foreground/60">Projects</div>
            </div>
            <div className="w-px bg-foreground/20"></div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">5</div>
              <div className="text-sm text-foreground/60">Categories</div>
            </div>
            <div className="w-px bg-foreground/20"></div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">3</div>
              <div className="text-sm text-foreground/60">Years</div>
            </div>
          </div>
        </motion.div>

        {/* CMS Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center p-8 bg-accent-blue/10 rounded-3xl border border-accent-blue/20"
        >
          <p className="text-lg text-foreground/70">
            🎨 <strong>Content Management:</strong> Add and manage your portfolio items through the{' '}
            <Link href="/admin" className="text-accent-purple hover:underline font-semibold">
              Admin Panel
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
