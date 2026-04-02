'use client';
import { useEffect, useRef } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import MagneticCursor from '@/components/MagneticCursor';
import GradientOrbs from '@/components/GradientOrbs';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ventures from '@/components/Ventures';
import Services from '@/components/Services';
import ProjectGallery from '@/components/ProjectGallery';
import AboutMe from '@/components/AboutMe';
import CallToAction from '@/components/CallToAction';

// Ambient color configs per section
const sectionColors: Record<string, { r: number; g: number; b: number; opacity: number }> = {
  home:     { r: 201, g: 169, b: 110, opacity: 0.08 },
  ventures: { r: 201, g: 169, b: 110, opacity: 0.12 },
  services: { r: 201, g: 169, b: 110, opacity: 0.14 },
  work:     { r: 100, g: 140, b: 200, opacity: 0.12 },
  about:    { r: 150, g: 120, b: 200, opacity: 0.12 },
  contact:  { r: 201, g: 169, b: 110, opacity: 0.14 },
};

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = Object.keys(sectionColors);

    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            const c = sectionColors[sections[i]];
            const root = document.documentElement;
            root.style.setProperty('--ambient-r', String(c.r));
            root.style.setProperty('--ambient-g', String(c.g));
            root.style.setProperty('--ambient-b', String(c.b));
            root.style.setProperty('--ambient-opacity', String(c.opacity));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <div ref={mainRef} className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <MagneticCursor />
        <GradientOrbs />
        <ScrollProgress />
        <Navbar />

        <Hero />
        <Ventures />
        <ProjectGallery />
        <Services />
        <AboutMe />
        <CallToAction />
      </div>
    </SmoothScroll>
  );
}
