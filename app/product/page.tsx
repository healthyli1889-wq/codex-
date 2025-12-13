'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample product data - will be replaced with CMS content
const products = [
  {
    id: 1,
    title: 'Innovation Project Alpha',
    description: 'A groundbreaking solution that transforms the way we think about digital experiences.',
    image: '/images/product-placeholder.jpg',
    category: 'Digital Product',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Creative Tool Beta',
    description: 'Empowering creators with cutting-edge tools for their artistic journey.',
    image: '/images/product-placeholder.jpg',
    category: 'Software',
    status: 'In Development',
  },
];

export default function ProductPage() {
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
            ✦ Products
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover my innovative products and creations designed to make a difference.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all hover:shadow-2xl hover:shadow-accent-purple/20"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-accent-blue to-accent-purple opacity-20 group-hover:opacity-30 transition-opacity" />

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-accent-purple/20 text-accent-purple rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 text-sm bg-accent-teal/20 text-accent-teal rounded-full">
                    {product.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {product.title}
                </h3>

                <p className="text-foreground/60 mb-6">
                  {product.description}
                </p>

                <button className="flex items-center gap-2 text-accent-purple font-semibold group-hover:gap-4 transition-all">
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CMS Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center p-8 bg-accent-blue/10 rounded-3xl border border-accent-blue/20"
        >
          <p className="text-lg text-foreground/70">
            🎨 <strong>Content Management:</strong> Add and manage your products through the{' '}
            <Link href="/admin" className="text-accent-purple hover:underline font-semibold">
              Admin Panel
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
