"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import dynamic from 'next/dynamic';
import Hero1 from "./utils/Hero1.json";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px]" /> // Loading placeholder
});

export default function HeroOne() {
  return (
    <div className="relative h-full w-full bg-customColor-1" id="home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:py-24">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:px-6 lg:py-24">
            <h1 className="text-3xl font-extrabold text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="relative z-10">
                  Develop{" "}
                  <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                    skills
                  </span>
                  <br />
                  from the best <br />
                  source
                </span>
                <Image
                  src="/paper.png"
                  alt="Education"
                  width={300}
                  height={300}
                  className="absolute h-full z-0 hidden lg:block"
                  style={{
                    transform: "translate(20%, -190%) scaleX(-1.3) scaleY(1.6)",
                  }}
                />
              </div>
            </h1>
            <p className="mt-4 text-1xl text-gray-00 md:mt-6 md:text-lg lg:mt-8">
              We aim to inspire a love for learning by creating an environment
              where students can explore their interests, develop new skills,
              and reach their full potential. Join us on this exciting
              educational adventure and discover the joy of learning with
              Gyaan!
            </p>
            <button className="h-12 font-semibold w-36 mt-4 border-black border-2 p-2.5 bg-[#d0f0e4] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg ">
              <span className="font-bold text-black">Join Now !</span>
            </button>
          </div>
          <div className="flex justify-center relative mt-12 lg:mt-0 lg:col-span-1 xl:col-span-1">
            <Image
              src="/code.svg"
              alt="Education"
              width={150}
              height={150}
              className="absolute h-full z-0 hidden lg:block"
              style={{
                transform: "translate(-134%, -42%) rotate(-10deg)"
              }}
            />
            <Image
              src="/graph.svg"
              alt="Education"
              width={120}
              height={120}
              className="absolute h-full z-0 hidden lg:block"
              style={{
                transform: "translate(0%, -48%) rotate(23deg)",
              }}
            />
            <Image
              src="/creative.svg"
              alt="Education"
              width={120}
              height={120}
              className="absolute h-full hidden lg:block"
              style={{
                transform: "translate(180%, -44%)",
                zIndex: 1,
              }}
            />
            <Suspense fallback={<div className="w-full h-[400px]" />}>
              <Lottie
                animationData={Hero1}
                className="relative z-10 bottom-2"
                style={{ filter: "drop-shadow(3px 3px 3px #555)" }}
              />
            </Suspense>
            <Image
              src="/desk.png"
              alt="Education"
              width={300}
              height={300}
              className="absolute h-full z-0 hidden lg:block"
              style={{
                transform: "translate(5%, 48%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
