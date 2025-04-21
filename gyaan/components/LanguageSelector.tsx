'use client';

import { useLanguage } from "@/app/context/LanguageContext";
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'Kannada' },
    { code: 'ta', label: 'Tamil' },
    { code: 'te', label: 'Telugu' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border-2 border-black bg-[#d0f0e4] hover:bg-[#79F7FF] active:bg-[#00E1EF] rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
      >
        <Globe className="w-5 h-5 text-black" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,1)] z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-black hover:bg-[#79F7FF] active:bg-[#00E1EF] font-semibold ${
                lang === l.code ? 'bg-[#d0f0e4]' : ''
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
