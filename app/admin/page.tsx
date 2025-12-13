'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

type ContentType = 'product' | 'article' | 'podcast' | 'portfolio' | null;

const contentTypes = [
  {
    type: 'product',
    title: 'Products',
    icon: '✦',
    description: 'Manage your products and creations',
    color: 'from-blue-400 to-purple-500',
  },
  {
    type: 'article',
    title: 'Articles & Research',
    icon: '◆',
    description: 'Manage blog posts and research work',
    color: 'from-purple-400 to-pink-500',
  },
  {
    type: 'podcast',
    title: 'Podcast Episodes',
    icon: '◈',
    description: 'Manage podcast episodes',
    color: 'from-green-400 to-blue-500',
  },
  {
    type: 'portfolio',
    title: 'Portfolio Items',
    icon: '◇',
    description: 'Manage your creative work',
    color: 'from-pink-400 to-purple-500',
  },
];

export default function AdminPage() {
  const [selectedType, setSelectedType] = useState<ContentType>(null);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient font-[var(--font-space-grotesk)]">
                ⚙️ Admin Panel
              </h1>
              <p className="text-xl text-foreground/70">
                Manage your content, upload materials, and update your website
              </p>
            </div>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 font-semibold"
              >
                ← Back to Site
              </motion.button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Products', count: 2, icon: '✦' },
              { label: 'Articles', count: 3, icon: '◆' },
              { label: 'Podcasts', count: 3, icon: '◈' },
              { label: 'Portfolios', count: 4, icon: '◇' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.count}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {!selectedType ? (
          /* Content Type Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentTypes.map((content, index) => (
              <motion.button
                key={content.type}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedType(content.type as ContentType)}
                className="group text-left bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 transition-all hover:shadow-xl hover:shadow-accent-purple/20"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  {content.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {content.title}
                </h3>
                <p className="text-foreground/60 group-hover:text-foreground/80 transition-colors mb-4">
                  {content.description}
                </p>
                <div className="flex items-center gap-2 text-accent-purple font-semibold">
                  Manage Content
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          /* Content Management Form */
          <ContentForm
            type={selectedType}
            onBack={() => setSelectedType(null)}
          />
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl p-8 border border-accent-purple/30"
        >
          <h3 className="text-2xl font-bold mb-4">📚 How to Use the Admin Panel</h3>
          <ul className="space-y-3 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-accent-purple mt-1">•</span>
              <span>Click on any content type to add or manage items</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-purple mt-1">•</span>
              <span>Fill in the form fields and upload images/files as needed</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-purple mt-1">•</span>
              <span>Content is saved as markdown files in the /content directory</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-purple mt-1">•</span>
              <span>Changes appear immediately on your website after saving</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function ContentForm({ type, onBack }: { type: ContentType; onBack: () => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('type', type || '');
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append('file', file);
    }

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Content saved successfully!');
        setFormData({});
        setFile(null);
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  const getFormFields = () => {
    switch (type) {
      case 'product':
        return ['title', 'description', 'category', 'status'];
      case 'article':
        return ['title', 'excerpt', 'category', 'content'];
      case 'podcast':
        return ['title', 'description', 'season', 'episode', 'duration'];
      case 'portfolio':
        return ['title', 'description', 'category', 'year', 'tags'];
      default:
        return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Add New {type}</h2>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-800/50 hover:border-accent-purple/50 font-semibold"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {getFormFields().map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium mb-2 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {field === 'content' || field === 'description' ? (
              <textarea
                id={field}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                rows={field === 'content' ? 10 : 4}
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                placeholder={`Enter ${field}...`}
                required
              />
            ) : (
              <input
                type="text"
                id={field}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                placeholder={`Enter ${field}...`}
                required
              />
            )}
          </div>
        ))}

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Image/File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-accent-purple/50 transition-colors">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
              accept="image/*,audio/*,video/*,.pdf,.md"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-foreground/60 mb-2">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-foreground/40">
                Images, audio, video, PDF, or markdown files
              </p>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-all"
        >
          Save Content
        </motion.button>
      </form>
    </motion.div>
  );
}
