'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Product', href: '/product', icon: '✦' },
  { name: 'Information Hacker', href: '/information-hacker', icon: '◆' },
  { name: 'Find Me!', href: '/contact', icon: '✧' },
  { name: 'Podcast', href: '/podcast', icon: '◈' },
  { name: 'Portfolios', href: '/portfolios', icon: '◇' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <motion.div
              className="text-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              ◉ Creation Space
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-2 text-sm font-medium ${
                      isActive
                        ? 'text-accent-purple'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <span className="text-accent-blue">{item.icon}</span>
                    {item.name}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ items }: { items: typeof navItems }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`flex items-center gap-2 text-lg ${
                      isActive
                        ? 'text-accent-purple'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    <span className="text-accent-blue">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}

// Import React for useState
import React from 'react';
