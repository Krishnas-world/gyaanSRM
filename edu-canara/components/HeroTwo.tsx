"use client";
import Image from "next/image";
import React from "react";
import Card from "./Card";
import Link from "next/link";

export default function HeroTwo() {
  return (
    <div className="relative h-full w-full bg-customColor-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="m-3 flex flex-col lg:flex-row lg:justify-center text-left lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-extrabold text-black tracking-tight md:text-4xl text-left lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="z-10">
                  Special{" "}
                  <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                    Features
                  </span>
                  <br />
                  tailored just for <br />
                  you!
                </span>
              </div>
            </h1>
          </div>
          <div className="relative mt-6 lg:mt-0 lg:w-1/2">
            <Image
              src="/scribble.svg"
              alt="Education"
              width={100}
              height={120}
              className="absolute h-full hidden lg:block"
              style={{
                transform: "translate(600%, -54%) rotate(90deg)",
                zIndex: 0, // Lower zIndex to keep it below other elements
              }}
            />
            <p className="text-lg font-normal text-gray-700 md:text-xl text-left lg:ml-8">
              Explore tailored features designed to meet your unique needs. From personalized tools to intuitive interfaces, we focus on enhancing your experience every step of the way.
            </p>
            <Link href='#'>
              <button className="h-12 font-semibold w-full sm:w-36 mt-4 border-black border-2 p-2.5 bg-orange-400 hover:bg-orange-500 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-customColor-2 rounded-lg lg:m-8">
                <span className="font-bold text-white">Join Now !</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-7 justify-center lg:justify-between py-10">
          <Card image="/medal.svg" heading='Competitons' text="Description for image 1" />
          <Card image="/event.svg" heading='Events' text="Description for image 2" />
          <Card image="/video.svg" heading='Video Courses' text="Description for image 3" />
        </div>
      </div>
    </div>
  );
}
