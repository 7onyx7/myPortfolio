'use client';
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

export default function Home() {
  const myBio = "Hey there! I'm Onyx, a passionate Computer Science student focused on building a career in Software Engineering. Creating innovative solutions and studying new technologies is my passion. I love to learn and grow, and I'm always looking for bigger challenges to tackle.";
  const mySkills = ["React", "Next.js", "Express.js", "Tailwind CSS", "PostgreSQL", "C++", "Java", "Python"];
  const myAchievements = [
    "💻Solo Founder & SWE @ bantrwrld📱",
    "🏆Winner of the Patient Safety Technology Challenge at Uncommon Hacks 2025!🥇",
    "👨‍💻Completed a 6-month self-guided internship as an IT Desktop Support Technician.🔧"
  ];

  return (
    <div className="min-h-screen bg-black text-white relative" style={{ scrollBehavior: 'smooth' }}>
      <ScrollProgress />
      <ClientStarryBackground />
      <Navbar />

      {/* Home Section */}
      <motion.main
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center min-h-[90vh] p-8 pt-20 relative">
          <div className="flex flex-col items-center space-y-8">
            <ProfilePicture
              src="/pfp.gif"
              alt="Onyx's Profile Picture"
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
        className="relative z-10 min-h-screen flex items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="pt-32 pb-32 px-8 w-full">
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
        className="relative z-10 min-h-screen flex items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="pb-32 px-8 w-full">
          <ProjectGallery />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="relative z-10 min-h-screen flex items-center bg-black"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full bg-black flex justify-center items-center py-32">
          <Contact />
        </div>
      </motion.section>
    </div>
  );
}