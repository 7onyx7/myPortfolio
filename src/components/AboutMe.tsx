import React from 'react';

interface AboutMeProps {
    bio: string;
    skills: string[];
    achievements: string[];
}

export default function AboutMe({ bio, skills, achievements }: AboutMeProps) {
    return (
      <section className="my-16 p-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-xl max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 border-b-4 border-indigo-400 inline-block">About Me</h2>
        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 mb-12 px-4 md:px-0">{bio}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100/30 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-100 px-5 py-2 rounded-full text-base backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-4">Achievements</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="bg-green-100/30 dark:bg-green-800/30 text-green-800 dark:text-green-100 px-5 py-2 rounded-full text-base backdrop-blur-sm"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }