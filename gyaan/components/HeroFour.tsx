"use client";
import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import Hero3 from "./utils/Hero3.json";
export default function HeroFour() {
  return (
    <div className="relative h-full w-full bg-customColor-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:py-24">
        <div className="flex justify-center relative mt-12 lg:mt-0 lg:col-span-1 xl:col-span-1">
            <Lottie
              animationData={Hero3}
              className="relative z-10 bottom-2"
              
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:px-6 lg:py-24">
            <h1 className="text-3xl font-extrabold text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="relative z-10">
                Take,{" "}
                  <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                  Tests
                  </span><br />
                  and get results instantly!
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
            Experience the convenience of instant feedback with our platform. Take tests at your own pace and receive your results immediately, empowering you to track your progress and improve without delay.
            </p>
            <button className="h-12 font-semibold w-36 mt-4 border-black border-2 p-2.5 bg-orange-400 hover:bg-orange-500 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-customColor-2 rounded-lg ">
              <span className="font-bold text-white">Take Tests</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
