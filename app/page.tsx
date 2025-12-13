'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Product',
    description: 'Discover my innovative products and creations',
    icon: '✦',
    href: '/product',
    gradient: 'from-blue-400 to-purple-500',
  },
  {
    title: 'Information Hacker',
    description: 'Research work, newsletters & insights',
    icon: '◆',
    href: '/information-hacker',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Find Me!',
    description: 'Get in touch and connect',
    icon: '✧',
    href: '/contact',
    gradient: 'from-teal-400 to-green-500',
  },
  {
    title: 'Podcast',
    description: 'Listen to my latest episodes',
    icon: '◈',
    href: '/podcast',
    gradient: 'from-green-400 to-blue-500',
  },
  {
    title: 'Portfolios',
    description: 'Welcome to my creation space',
    icon: '◇',
    href: '/portfolios',
    gradient: 'from-pink-400 to-purple-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-32 md:py-40">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient font-[var(--font-space-grotesk)]">
              Welcome to My
              <br />
              Creation Space
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              A digital sanctuary where innovation meets creativity. Explore my work, thoughts, and creations.
            </p>
          </motion.div>

          {/* Animated decorative elements */}
          <motion.div
            className="flex justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {['◉', '◈', '◇', '◆', '✦'].map((symbol, i) => (
              <motion.span
                key={i}
                className="text-4xl text-accent-purple"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {symbol}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={section.href}>
                  <div className="group relative p-8 rounded-3xl bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-purple/20 h-full">
                    {/* Icon */}
                    <div className="text-5xl mb-4 transition-transform group-hover:scale-110 group-hover:rotate-12">
                      {section.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                      {section.title}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground/60 group-hover:text-foreground/80 transition-colors">
                      {section.description}
                    </p>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity -z-10`} />

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute bottom-8 right-8 text-accent-purple opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Create Something{' '}
            <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Dive into my world of creativity, innovation, and exploration.
          </p>
          <Link href="/contact">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
