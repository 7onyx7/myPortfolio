import React from 'react';

interface HelloWorldProps {
  name: string;
}

export default function HelloWorld({ name }: HelloWorldProps) {
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(129,140,248,0.7)]">
      Hello, I'm {name}!
    </h1>
  );
}