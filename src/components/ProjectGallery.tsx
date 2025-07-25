'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { FiBox } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'AI' | 'game' | 'other';
}

// Sample projects - you can replace these with your actual projects
const projects: Project[] = [
  {
    id: 1,
    title: "bantrhaus",
    description: "A cozy chatroom platform for users to safely connect, vibe with new pals, and share their thoughts.",
    image: "/bh.png",
    technologies: ["React", "Express.js", "PostgreSQL"],
    githubUrl: "https://github.com/7onyx7/bantrhaus",
    liveUrl: "https://bantrhaus.com",
    category: "web"
  },
  {
    id: 2,
    title: "RxClash (formerly MediScan)",
    description: "A Gemini powered AI medication analysis tool to inform patients and prevent medical mishaps.",
    image: "/rxclash.png",
    technologies: ["React","React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/7onyx7/RxClash",
    category: "mobile"
  },
  {
    id: 3,
    title: "PROJECT FIRE",
    description: "COMING SOON - Stealth AI App",
    image: "/placeholder-project-3.jpg",
    technologies: ["Python", "OpenAI API", "WebSocket", "Electron", "Node.js"],
    githubUrl: "https://github.com/7onyx7/secret-project",
    category: "AI"
  },
  {
    id: 4,
    title: "C++ Minesweeper",
    description: "A classic Minesweeper game built with C++ with a very basic console UI.",
    image: "/placeholder-project-4.jpg",
    technologies: ["C++"],
    githubUrl: "https://github.com/7onyx7/minesweeper",
    category: "game"
  },
  {
    id: 5,
    title: "EZ PC",
    description: "An application for newbie PC gamers to easily optimize their gaming experience.",
    image: "/placeholder-project-5.jpg",
    technologies: ["Electron", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/7onyx7/secret-project",
    category: "other"
  },
    {
        id: 6,
        title: "Sphere render",
        description: "C++ sphere render",
        image: "/placeholder-project-6.jpg",
        technologies: ["C++", "OpenGL"],
        githubUrl: "https://github.com/7onyx7/OpenGLGame",
        category: "game"
    }
];

const categories = ['all', 'web', 'mobile', 'AI', 'game', 'other'];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="projects" className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-default leading-tight"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              lineHeight: '1.1',
              paddingBottom: '0.25rem'
            }}
          >
            My Projects
          </motion.h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A showcase of my work spanning web development, mobile apps, AI integration, and more.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const count = category === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === category).length;
            
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category} ({count})
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={`${selectedCategory}-${project.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 overflow-hidden">
                    {project.image && !project.image.startsWith('/placeholder-project') ? (
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiBox className="text-7xl text-indigo-400/40" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.category === 'web' ? 'bg-blue-500/20 text-blue-300' :
                        project.category === 'mobile' ? 'bg-green-500/20 text-green-300' :
                        project.category === 'AI' ? 'bg-yellow-400/20 text-yellow-300' :
                        project.category === 'game' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-orange-500/20 text-orange-300'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              No projects found in the &ldquo;{selectedCategory}&rdquo; category.
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
            >
              Show All Projects
            </button>
          </motion.div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 rounded-xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col items-center justify-center"
                tabIndex={-1}
                ref={el => {
                  if (el) el.scrollTop = 0;
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-300 hover:text-red-100 transition-all duration-200 z-20 border border-red-400/30"
                  aria-label="Close modal"
                >
                  <span className="text-lg font-bold">✕</span>
                </button>

                {/* Modal Header */}
                <div className="relative h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
                  {selectedProject.image && !selectedProject.image.startsWith('/placeholder-project') ? (
                    <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      width={600}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiBox className="text-8xl text-indigo-400/40" />
                    </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedProject.category === 'web' ? 'bg-blue-500/20 text-blue-300' :
                      selectedProject.category === 'mobile' ? 'bg-green-500/20 text-green-300' :
                      selectedProject.category === 'AI' ? 'bg-yellow-400/20 text-yellow-300' :
                      selectedProject.category === 'game' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {selectedProject.category}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </motion.a>
                    )}
                    {selectedProject.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
