'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';
import projectsData from '@/data/projects.json';

interface Venture {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  type?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const ventures: Venture[] = (projectsData as Venture[]).filter((p) => p.type === 'venture');

export default function Ventures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="ventures" className="relative z-10 py-32 px-6 sm:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <ScrollRevealText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Ventures
          </ScrollRevealText>
          <motion.div
            className="mt-4 mx-auto w-16 h-[1px]"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Venture Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.id}
              className="glass rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[rgba(201,169,110,0.1)] to-transparent">
                {venture.imageUrl ? (
                  <Image
                    src={venture.imageUrl}
                    alt={venture.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20">&#9670;</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {venture.subtitle && (
                  <span
                    className="text-xs uppercase tracking-widest mb-3 block"
                    style={{ color: 'var(--accent)' }}
                  >
                    {venture.subtitle}
                  </span>
                )}
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--fg)' }}
                >
                  {venture.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {venture.longDescription || venture.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {venture.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(201,169,110,0.1)',
                        color: 'var(--accent)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                {venture.liveUrl && (
                  <a
                    href={venture.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: 'var(--accent)' }}
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Visit Site
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
