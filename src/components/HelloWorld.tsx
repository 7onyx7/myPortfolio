import React from 'react';

interface HelloWorldProps {
  name: string;
}

export default function HelloWorld({ name }: HelloWorldProps) {
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(129,140,248,0.7)] animate-fade-in-up transition-transform duration-500 hover:scale-110 cursor-default">
      Hello, I&#39;m {name}!
    </h1>
  );
}