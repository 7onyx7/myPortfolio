'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiChevronDown } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';
import projectsData from '@/data/projects.json';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string;
  type?: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = (projectsData as Project[]).filter((p) => p.type !== 'venture');
const categories = ['all', 'web', 'ai', 'fullstack'];
const categoryLabels: Record<string, string> = {
  all: 'All',
  web: 'Web',
  ai: 'AI',
  fullstack: 'Full-Stack',
};

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative z-10 py-32 px-6 sm:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <ScrollRevealText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Projects
          </ScrollRevealText>
          <motion.div
            className="mt-4 mx-auto w-16 h-[1px]"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-12 relative">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors"
              style={{
                color: activeCategory === cat ? 'var(--bg)' : 'var(--fg-muted)',
              }}
              data-magnetic
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{categoryLabels[cat]}</span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                }}
                className="glass rounded-xl overflow-hidden group"
                data-magnetic
              >
                {/* Card image */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[rgba(201,169,110,0.05)] to-transparent">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-10">&#9670;</span>
                    </div>
                  )}
                  {/* Category badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'var(--accent)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'var(--fg-muted)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[11px] px-2 py-0.5" style={{ color: 'var(--fg-muted)' }}>
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === project.id ? null : project.id)
                    }
                    className="flex items-center gap-1 text-xs transition-colors"
                    style={{ color: 'var(--accent)' }}
                  >
                    {expandedId === project.id ? 'Less' : 'More'}
                    <motion.span
                      animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-3 h-3" />
                    </motion.span>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/5 mt-4">
                          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                            {project.longDescription || project.description}
                          </p>
                          <div className="flex gap-4">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
                                style={{ color: 'var(--fg-muted)' }}
                              >
                                <FiGithub className="w-4 h-4" /> Code
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
                                style={{ color: 'var(--accent)' }}
                              >
                                <FiExternalLink className="w-4 h-4" /> Live
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
