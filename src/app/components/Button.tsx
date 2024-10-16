'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string; // Optional href prop to specify the link
  className?: string; // Optional className prop
}

export default function Button({ text, onClick, href, className }: ButtonProps) {
  // Define the default styles
  const defaultStyles =
    'py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href}>
        {/* Combine custom and default styles if className is provided */}
        <a className={`${defaultStyles} ${className || ''}`.trim()}>{text}</a>
      </Link>
    );
  }

  // Otherwise, render as a standard button
  return (
    <button
      onClick={handleClick}
      className={`${defaultStyles} ${className || ''}`.trim()}
    >
      {text}
    </button>
  );
}
