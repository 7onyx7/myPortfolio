import Image from "next/image";
import HelloWorld from '@/components/HelloWorld';
import AboutMe from '@/components/AboutMe';
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
    <div className="relative bg-black min-h-screen">
      <ClientStarryBackground />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <HelloWorld name="Onyx" />
          
          <AboutMe 
            bio={myBio}
            skills={mySkills}
            achievements={myAchievements}
          />

        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
         
        </footer>
      </div>
    </div>
  );
}
