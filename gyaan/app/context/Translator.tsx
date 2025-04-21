'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import React from 'react';

type TransProps = {
  children: React.ReactNode;
};

export const Trans = ({ children }: TransProps) => {
  const { lang } = useLanguage();
  const [translated, setTranslated] = useState<React.ReactNode>(children);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (typeof children !== 'string' || lang === 'en') {
        setTranslated(children);
        return;
      }

      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: children, to: lang }),
        });

        const data = await res.json();
        setTranslated(data.translatedText);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslated(children);
      }
    };

    fetchTranslation();
  }, [children, lang]);

  return <>{translated}</>;
};
