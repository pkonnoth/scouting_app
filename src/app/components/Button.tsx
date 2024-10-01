'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string; // Optional className prop
}

export default function Button({ text, onClick, className }: ButtonProps) {
  // Define the default styles
  const defaultStyles =
    'py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';

  return (
    <button
      onClick={onClick}
      // Use the passed className if provided, otherwise use the default styles
      className={className ? className : defaultStyles}
    >
      {text}
    </button>
  );
}
