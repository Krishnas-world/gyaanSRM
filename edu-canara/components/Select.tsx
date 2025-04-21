import React, { useState } from 'react';

interface SelectProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const options = [
    '10th Grade',
    '11th Grade',
    '12th Grade',
    // Add more options as needed
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 bg-[#B8FF9F] hover:bg-[#99fc77] px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        onClick={handleToggle}
      >
        {selectedValue || 'Select Grade'}
        <svg
          className="mt-1 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black"
          role="menu"
          aria-orientation="vertical"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block px-4 py-2 text-sm text-left hover:bg-[#B8FF9F] hover:font-medium ${option === selectedValue ? 'bg-[#B8FF9F]' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
