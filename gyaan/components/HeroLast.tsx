"use client";
import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import Hero3 from "./utils/Hero3.json";
export default function HeroLast() {
    return (
        <div className="relative h-full w-full bg-customColor-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:py-24">
                    <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:px-6 lg:py-24">
                        <h1 className="text-3xl font-extrabold text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
                            <div className="relative inline-block">
                                <span className="relative z-10">
                                    Our Mobile App is{" "}
                                    <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                                        Coming Soon
                                    </span><br />
                                </span>
                            </div>
                        </h1>
                        <p className="mt-4 text-1xl text-gray-00 md:mt-6 md:text-lg lg:mt-8">
                        Stay tuned for the latest updates and be the first to know when our app launches. We're working hard to bring you a seamless and exciting experience. 
                        </p>
                        <button 
                            disabled 
                            className="h-12 font-semibold w-36 mt-4 border-gray-400 border-2 p-2.5 bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg">
                            <span className="font-bold text-white">Download</span>
                        </button>
                    </div>
                    <div className="flex justify-center relative mt-12 lg:mt-0 lg:col-span-1 xl:col-span-1">
                        <Image src='/app.svg' width={500} height={500} alt="Mobile app"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
