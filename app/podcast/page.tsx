'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample podcast episodes - will be replaced with CMS content
const episodes = [
  {
    id: 1,
    title: 'The Future of Creative Technology',
    description: 'Exploring how emerging technologies are reshaping creative industries and empowering creators.',
    date: '2024-12-08',
    duration: '45:32',
    season: 1,
    episode: 12,
    audioUrl: '#',
  },
  {
    id: 2,
    title: 'Innovation in Design Thinking',
    description: 'A deep dive into design thinking methodologies and how they drive innovation.',
    date: '2024-12-01',
    duration: '38:15',
    season: 1,
    episode: 11,
    audioUrl: '#',
  },
  {
    id: 3,
    title: 'Building Digital Products',
    description: 'Lessons learned from building and launching successful digital products.',
    date: '2024-11-24',
    duration: '52:48',
    season: 1,
    episode: 10,
    audioUrl: '#',
  },
];

export default function PodcastPage() {
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
            ◈ Podcast
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Conversations about technology, creativity, and innovation. New episodes weekly.
          </p>
        </motion.div>

        {/* Featured Episode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl p-8 md:p-12 border border-accent-purple/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-accent-purple text-white rounded-full font-semibold text-sm">
              Latest Episode
            </span>
            <span className="text-sm text-foreground/60">Season {episodes[0].season}, Episode {episodes[0].episode}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">{episodes[0].title}</h2>
          <p className="text-lg text-foreground/70 mb-6 max-w-3xl">
            {episodes[0].description}
          </p>

          <div className="flex items-center gap-6 mb-8">
            <span className="text-foreground/60">{episodes[0].date}</span>
            <span className="text-foreground/60">• {episodes[0].duration}</span>
          </div>

          {/* Audio Player Placeholder */}
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center text-white text-2xl hover:shadow-lg hover:shadow-accent-purple/50 transition-all"
              >
                ▶
              </motion.button>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-foreground/50">
                  <span>15:24</span>
                  <span>{episodes[0].duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe Buttons */}
          <div className="flex flex-wrap gap-4">
            {['Apple Podcasts', 'Spotify', 'Google Podcasts', 'RSS'].map((platform) => (
              <motion.button
                key={platform}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 font-semibold transition-all"
              >
                {platform}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Episodes List */}
        <div>
          <h2 className="text-3xl font-bold mb-8">All Episodes</h2>
          <div className="space-y-6">
            {episodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="group bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all hover:shadow-xl hover:shadow-accent-purple/10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center text-white text-xl hover:shadow-lg hover:shadow-accent-purple/50 transition-all flex-shrink-0"
                  >
                    ▶
                  </motion.button>

                  {/* Episode Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-foreground/50">
                        S{episode.season}E{episode.episode}
                      </span>
                      <span className="text-sm text-foreground/50">• {episode.duration}</span>
                      <span className="text-sm text-foreground/50">• {episode.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all">
                      {episode.title}
                    </h3>
                    <p className="text-foreground/60">{episode.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity text-2xl md:ml-4">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CMS Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center p-8 bg-accent-blue/10 rounded-3xl border border-accent-blue/20 mt-16"
        >
          <p className="text-lg text-foreground/70">
            🎙️ <strong>Content Management:</strong> Add and manage your podcast episodes through the{' '}
            <Link href="/admin" className="text-accent-purple hover:underline font-semibold">
              Admin Panel
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
