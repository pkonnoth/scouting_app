'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string; // Optional href prop to specify the link
  className?: string; // Optional className prop
}

export default function Button({ text, onClick, href, className }: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  // Define the default styles
  const defaultStyles =
    'py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-';

  const handleClick = () => {
    if (onClick) {
      setIsClicked(true);
      onClick();
      setIsClicked(false); // Reset the state after the action
    }
  };

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href} passHref>
        <a
          className={className ? className : defaultStyles}
          onClick={handleClick}
        >
          {text}
        </a>
      </Link>
    );
  }

  // Otherwise, render as a standard button
  return (
    <button
      onClick={handleClick}
      className={className ? className : defaultStyles}
    >
      {text}
    </button>
  );
}
