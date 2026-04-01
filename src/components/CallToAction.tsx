'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

const socials = [
  { icon: FiGithub, href: 'https://github.com/7onyx7', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/romeoshamoun', label: 'LinkedIn' },
];

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="contact" className="relative z-10 py-32 px-6 sm:px-8">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        {/* Statement */}
        <ScrollRevealText
          as="h2"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
        >
          Let&apos;s build something together.
        </ScrollRevealText>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base sm:text-lg max-w-lg mx-auto"
          style={{ color: 'var(--fg-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Have a project in mind? I&apos;m always open to new opportunities and
          collaborations.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="mailto:romeo.shamoun23@gmail.com"
          data-magnetic
          className="inline-flex items-center gap-3 mt-12 px-10 py-4 rounded-full border text-base font-medium tracking-wider uppercase transition-all duration-300"
          style={{
            borderColor: 'rgba(201, 169, 110, 0.4)',
            color: 'var(--accent)',
          }}
          whileHover={{
            borderColor: 'rgba(201, 169, 110, 1)',
            boxShadow: '0 0 40px rgba(201, 169, 110, 0.2)',
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <FiMail className="w-5 h-5" />
          Get in Touch
        </motion.a>

        {/* Socials */}
        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--fg-muted)',
              }}
              whileHover={{
                borderColor: 'rgba(201,169,110,0.3)',
                color: '#c9a96e',
                y: -2,
              }}
              data-magnetic
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            &copy; {new Date().getFullYear()} Romeo Shamoun &middot; Built with Next.js
          </p>
        </motion.div>
      </div>
    </section>
  );
}
