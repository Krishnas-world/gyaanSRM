'use client';

import HeroOne from '@/components/HeroOne';
import HeroThree from '@/components/HeroThree';
import HeroTwo from '@/components/HeroTwo';
import HeroFour from '@/components/HeroFour';
import HeroFive from '@/components/HeroFive';
import Image from 'next/image';
import React, { useEffect } from 'react';
import HeroLast from '@/components/HeroLast';
import withLoader from '@/components/WithLoader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const PageContent = () => {

  const scrollToHeroOne = () => {
    const heroOneElement = document.getElementById('hero-one');
    if (heroOneElement) {
      heroOneElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header />
      <HeroOne />
      <HeroTwo />
      <HeroThree />
      <HeroFive />
      <HeroFour />
      <HeroLast />
      <Footer />
      
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          zIndex: 1000
        }}
        onClick={scrollToHeroOne}
      >
        <Image src="/uparrow.svg" alt="Go to Hero One" width={50} height={50} className='border border-black rounded-full' />
      </div>
    </div>
  );
};

export default withLoader(PageContent);
