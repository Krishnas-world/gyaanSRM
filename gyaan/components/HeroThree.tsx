"use client";
import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import Hero2 from "./utils/Hero2.json";
export default function HeroThree() {
  return (
    <div className="relative h-full w-full bg-customColor-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:py-24">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:px-6 lg:py-24">
            <h1 className="text-3xl font-extrabold text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="relative z-10">
                Learn from Any Instructor,{" "}
                  <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                  Anytime
                  </span>
                </span>
                <Image
                  src="/exclamation.svg"
                  alt="Education"
                  width={90}
                  height={90}
                  className="absolute h-full z-0 lg:block"
                  style={{
                    transform: "translate(-120%, -150%) scaleX(-1.3) scaleY(1.6) rotate(30deg)",
                  }}
                />
              </div>
            </h1>
            <p className="mt-4 text-1xl text-gray-00 md:mt-6 md:text-lg lg:mt-8">
            Unlock the flexibility to learn from any instructor you choose. Our platform offers a diverse range of courses, allowing you to personalize your educational experience with the expert of your choice, whenever it suits you.
            </p>
            <button className="h-12 font-semibold w-36 mt-4 border-black border-2 p-2.5 bg-orange-400 hover:bg-orange-500 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-customColor-2 rounded-lg ">
              <span className="font-bold text-white">Join Now !</span>
            </button>
          </div>
          <div className="flex justify-center relative mt-12 lg:mt-0 lg:col-span-1 xl:col-span-1">
            <Lottie
              animationData={Hero2}
              className="relative z-10 bottom-2"
              style={{ filter: "drop-shadow(3px 3px 3px #555)" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
