'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import HelloWorld from '@/components/HelloWorld';
import AboutMe from '@/components/AboutMe';
import ProfilePicture from '@/components/ProfilePicture';
import ProjectGallery from '@/components/ProjectGallery';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollIndicator from '@/components/ScrollIndicator';
import ClientStarryBackground from '@/components/ClientStarryBackground';
import { useParallax } from '@/hooks/useParallax';

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const homeParallax = useParallax(homeRef, 50);
  const aboutParallax = useParallax(aboutRef, 100);
  const projectsParallax = useParallax(projectsRef, 75);
  const contactParallax = useParallax(contactRef, 50);

  const myBio = "Hello! I'm Onyx, a passionate Computer Science student focused on building a career in Software Engineering. Creating innovative solutions and studying new technologies is my passion. I love to learn and grow, and I'm always looking for bigger challenges to tackle.";
  const mySkills = ["React", "TypeScript", "Express.js", "Tailwind CSS", "PostgreSQL", "C++", "Java", "Python", " and more!"];
  const myAchievements = [
    "Completed & deployed full-stack projects.",
    "Winner of the Patient Safety Challenge at Uncommon Hacks 2025.",
    "Completed a 6-month self-guided internship as an IT Desktop Support Technician.",
  ];
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ScrollProgress />
      <ClientStarryBackground />
      <Navbar />
      
      {/* Home Section */}
      <motion.main 
        id="home" 
        ref={homeRef}
        className="relative z-10 min-h-screen"
        style={{ 
          y: homeParallax.y,
          opacity: homeParallax.opacity,
          scale: homeParallax.scale 
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-20 relative">
          <div className="flex flex-col items-center space-y-8">
            <ProfilePicture 
              src="/onyx.jpg" 
              alt="Onyx Profile Picture" 
              size="lg"
            />
            <HelloWorld name="Onyx" />
          </div>
          <ScrollIndicator />
        </div>
      </motion.main>

      {/* About Section */}
      <motion.section 
        id="about" 
        ref={aboutRef}
        className="relative z-10"
        style={{ 
          y: aboutParallax.y,
          opacity: aboutParallax.opacity,
          scale: aboutParallax.scale 
        }}
      >
        <div className="py-20 px-8">
          <AboutMe 
            bio={myBio}
            skills={mySkills}
            achievements={myAchievements}
          />
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        ref={projectsRef}
        className="relative z-10"
        style={{ 
          y: projectsParallax.y,
          opacity: projectsParallax.opacity,
          scale: projectsParallax.scale 
        }}
      >
        <ProjectGallery />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        ref={contactRef}
        className="relative z-10"
        style={{ 
          y: contactParallax.y,
          opacity: contactParallax.opacity,
          scale: contactParallax.scale 
        }}
      >
        <Contact />
      </motion.section>
    </div>
  );
}
