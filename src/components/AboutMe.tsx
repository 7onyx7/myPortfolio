'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollRevealText from './ScrollRevealText';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
} from 'react-icons/si';

const techStack = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'C++', icon: SiCplusplus },
];

const techVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="about" className="relative z-10 py-32 px-6 sm:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-20 text-center">
          <ScrollRevealText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            About Me
          </ScrollRevealText>
          <motion.div
            className="mt-4 mx-auto w-16 h-[1px]"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Narrative */}
          <div>
            <ScrollRevealText
              as="p"
              className="text-lg sm:text-xl leading-relaxed mb-6"
              delay={0.2}
            >
              Romeo here — a software developer and solo founder who builds websites, AI agents, and full-stack applications for clients who want results.
            </ScrollRevealText>
            <ScrollRevealText
              as="p"
              className="text-base leading-relaxed mb-6"
              delay={0.4}
              staggerDelay={0.02}
            >
              I thrive on solving complex problems and shipping products that look incredible and perform even better. From sleek landing pages to intelligent automation — if you can dream it, I can build it.
            </ScrollRevealText>
            <ScrollRevealText
              as="p"
              className="text-base leading-relaxed"
              delay={0.6}
              staggerDelay={0.02}
            >
              Winner of the Patient Safety Technology Challenge at Uncommon Hacks 2025. Based in Chicago — building for the world.
            </ScrollRevealText>
          </div>

          {/* Right — Tech Stack Grid */}
          <div>
            <motion.p
              className="text-xs uppercase tracking-widest mb-8"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Tech Stack
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="glass rounded-xl p-4 flex flex-col items-center gap-3 group"
                  custom={i}
                  variants={techVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{ y: -2, borderColor: 'rgba(201,169,110,0.2)' }}
                >
                  <tech.icon
                    className="w-6 h-6 transition-colors"
                    style={{ color: 'var(--fg-muted)' }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}