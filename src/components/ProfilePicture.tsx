'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfilePictureProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ProfilePicture({ 
  src, 
  alt, 
  size = 'lg' 
}: ProfilePictureProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32', 
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  // Fixed positions for particles to avoid hydration mismatch
  const particlePositions = [
    { top: 20, left: 30 },
    { top: 80, left: 70 },
    { top: 40, left: 80 },
    { top: 70, left: 25 },
    { top: 30, left: 60 },
    { top: 60, left: 45 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100 
      }}
      className="relative mx-auto mb-8"
    >
      {/* Outer glowing ring */}
      <motion.div
        animate={{ 
          rotate: 360,
          boxShadow: [
            "0 0 20px rgba(99, 102, 241, 0.5)",
            "0 0 40px rgba(168, 85, 247, 0.7)",
            "0 0 20px rgba(99, 102, 241, 0.5)"
          ]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`${sizeClasses[size]} rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
      >
        {/* Inner container with profile image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-full h-full rounded-full overflow-hidden bg-black/20 backdrop-blur-sm border-2 border-white/10"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
          
          {/* Subtle overlay for space theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/20 rounded-full" />
          
          {/* Shooting star effect on hover */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: -100 }}
            whileHover={{ 
              opacity: [0, 1, 0],
              x: ["-100%", "100%"],
              y: ["-100%", "100%"]
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"
            style={{
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles around the image */}
      {particlePositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + (i * 0.5), // Use index instead of random
            repeat: Infinity,
            delay: i * 0.3, // Use index instead of random
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}
