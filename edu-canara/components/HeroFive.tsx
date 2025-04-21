"use client";
import Image from "next/image";
import React from "react";
import Card from "./Card";
import Link from "next/link";

export default function HeroFive() {
  return (
    <div className="relative h-full w-full bg-customColor-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="m-3 flex flex-col lg:flex-row lg:justify-center text-left lg:text-left">
          <div className="lg:w-1/2 relative">
            <h1 className="text-3xl font-extrabold text-center text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="z-10">
                  Explore the wide range of{" "}
                  <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                    courses
                  </span>
                  <br />
                  we offer!
                </span>
              </div>
            </h1>
            <Image
              src="/scribble.svg"
              alt="Education"
              width={100}
              height={120}
              className="absolute h-full hidden lg:block"
              style={{
                transform: "translate(800%, -140%) rotate(90deg)",
                zIndex: 0, // Lower zIndex to keep it below other elements
              }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-7 justify-center lg:justify-between py-10">
          <Card image="/medal.svg" heading='UX Writing' text="★ 4.3 (100 Reviews)" bText="Enroll Now" />
          <Card image="/event.svg" heading='UI Designing' text="★ 4.5 (300 Reviews)" bText="Enroll Now" />
          <Card image="/video.svg" heading='WebDev' text="★ 4 (200 Reviews)" bText="Enroll Now" />
        </div>
        <div className="flex items-center justify-center">
          <Link href='/explore'>
            <button className="h-12 font-semibold w-36 mt-4 border-black border-2 p-2.5 bg-orange-400 hover:bg-orange-500 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-customColor-2 rounded-lg ">
              <span className="font-bold text-white">Explore More</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
