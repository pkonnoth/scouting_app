// src/components/TextField.tsx
'use client';

import { useState } from 'react';

interface TextFieldProps {
  id: string;
  placeholder: string;
  value?: string;
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'none' | 'decimal'; // Set specific types for inputMode
  pattern?: string;
  onChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ id, placeholder, value = '', inputMode, pattern, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      id={id}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      inputMode={inputMode} // Use inputMode here
      pattern={pattern}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
    />
  );
};

export default TextField;
