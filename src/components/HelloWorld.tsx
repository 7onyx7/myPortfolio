import React from 'react';
import { motion } from 'framer-motion';

interface HelloWorldProps {
  name: string;
}

export default function HelloWorld({ name }: HelloWorldProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        delay: 0.2
      }}
      className="text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(129,140,248,0.7)] cursor-default mb-16 pt-4"
      style={{ lineHeight: 1.25 }}
    >
      Welcome, I&#39;m {name}!
    </motion.h1>
  );
}