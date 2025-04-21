'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const StarryBackground = dynamic(() => import('./StarryBackground'), { ssr: false });

export default function ClientStarryBackground() {
  useEffect(() => {
    console.log('✅ ClientStarryBackground mounted');
  }, []);
  return <StarryBackground />;
}
