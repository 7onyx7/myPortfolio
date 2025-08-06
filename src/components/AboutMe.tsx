'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';


interface AboutMeProps {
  bio: React.ReactNode;
  skills: string[];
  achievements: string[];
}

const container: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      when: "beforeChildren", 
      staggerChildren: 0.1 
    } 
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0 }
};

export default function AboutMe({ bio, skills, achievements }: AboutMeProps) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto my-16 max-w-3xl p-8 bg-white/10 dark:bg-black/20
                 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/10
                 relative overflow-hidden
                 before:absolute before:inset-0 before:pointer-events-none
                 before:rounded-2xl 
                 before:from-indigo-500 before:via-purple-500 before:to-pink-500
                 before:bg-gradient-to-br before:opacity-20"
    >
      <motion.h2 
        variants={item}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        className="relative mb-6 text-center text-4xl font-bold text-white
                   dark:text-gray-100 cursor-default"
      >
        About Me
      </motion.h2>

      <motion.p variants={item}
        className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-200"
      >
        {bio}
      </motion.p>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <motion.h3 
            variants={item}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 text-2xl font-semibold text-indigo-200 text-center cursor-default"
          >
            Skills
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.span key={i} variants={item}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99,102,241,0.25)' }}
                className="rounded-full bg-indigo-200/20 px-4 py-1 text-sm font-medium
                           text-indigo-100 backdrop-blur-sm transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <motion.h3 
            variants={item}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 text-2xl font-semibold text-green-200 text-center cursor-default"
          >
            Achievements
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {achievements.map((ach, i) => (
              <motion.span key={i} variants={item}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="rounded-full bg-green-200/20 px-4 py-1 text-sm font-medium
                           text-green-100 backdrop-blur-sm transition-transform"
              >
                {ach}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}