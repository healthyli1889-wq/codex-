'use client';

import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Blob 1 - Blue/Purple */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blob blob-delay-1"
        style={{
          background: 'linear-gradient(135deg, #6b9bd1 0%, #9b87d6 100%)',
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 - Teal/Green */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blob blob-delay-2"
        style={{
          background: 'linear-gradient(135deg, #7dc4c4 0%, #88c9a1 100%)',
          top: '60%',
          right: '15%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3 - Purple/Pink */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blob blob-delay-3"
        style={{
          background: 'linear-gradient(135deg, #9b87d6 0%, #d688b5 100%)',
          bottom: '15%',
          left: '50%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 4 - Blue/Teal */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blob"
        style={{
          background: 'linear-gradient(135deg, #6b9bd1 0%, #7dc4c4 100%)',
          top: '40%',
          right: '40%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
