'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGlobe, FiCpu, FiLayers } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

const services = [
  {
    icon: FiGlobe,
    title: 'Custom Websites',
    description:
      'Sleek, high-performance websites that convert visitors into clients. Built with modern frameworks for speed, security, and stunning visuals.',
    points: ['Responsive Design', 'SEO Optimized', 'Lightning Fast'],
  },
  {
    icon: FiCpu,
    title: 'AI Agents',
    description:
      'Intelligent AI agents that automate workflows, enhance customer interactions, and give your business a competitive edge.',
    points: ['Custom Training', 'API Integration', 'Smart Automation'],
  },
  {
    icon: FiLayers,
    title: 'Full-Stack Apps',
    description:
      'End-to-end application development from database architecture to polished interfaces. Scalable solutions built to grow with you.',
    points: ['Scalable Architecture', 'Real-time Features', 'Cloud Ready'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="services" className="relative z-10 py-32 px-6 sm:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-20 text-center">
          <ScrollRevealText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            style-color="var(--fg)"
          >
            What I Build
          </ScrollRevealText>
          <motion.div
            className="mt-4 mx-auto w-16 h-[1px]"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass rounded-2xl p-8 group relative overflow-hidden"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                borderColor: 'rgba(201, 169, 110, 0.2)',
                y: -4,
              }}
              transition={{ duration: 0.3 }}
              data-magnetic
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(201, 169, 110, 0.1)' }}
              >
                <service.icon
                  className="w-6 h-6"
                  style={{ color: 'var(--accent)' }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--fg)' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--fg-muted)' }}
              >
                {service.description}
              </p>

              {/* Points */}
              <ul className="space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
