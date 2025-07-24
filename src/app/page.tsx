import HelloWorld from '@/components/HelloWorld';
import AboutMe from '@/components/AboutMe';
import ProjectGallery from '@/components/ProjectGallery';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import ClientStarryBackground from '@/components/ClientStarryBackground';

export default function Home() {
  const myBio = "Hello! I'm Onyx, a passionate Computer Science student with a focus in Software Engineering. I enjoy creating innovative solutions and exploring new technologies.";
  const mySkills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "C++", "Java", "Python", " and more!"];
  const myAchievements = [
    "Completed and working on multiple projects.",
    "Participated in hackathons and won Best Patient Safety Solution at Uncommon Hacks 2025!",
    "Achieved top grades in Computer Science courses.",
  ];
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ClientStarryBackground />
      <Navbar />
      
      {/* Home Section */}
      <main id="home" className="relative z-10 min-h-screen">
        <div className="flex items-center justify-center min-h-screen p-8 pt-20">
          <HelloWorld name="Onyx" />
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="relative z-10">
        <div className="py-20 px-8">
          <AboutMe 
            bio={myBio}
            skills={mySkills}
            achievements={myAchievements}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10">
        <ProjectGallery />
      </section>

      {/* Contact Section */}
      <section className="relative z-10">
        <Contact />
      </section>
    </div>
  );
}
