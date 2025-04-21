// components/Loader.tsx
import React from 'react';
import Lottie from 'lottie-react';
import loader from './utils/loader.json';

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10 overflow-hidden">
    <Lottie
      animationData={loader}
      className="relative z-10"
    />
  </div>
);

export default Loader;
