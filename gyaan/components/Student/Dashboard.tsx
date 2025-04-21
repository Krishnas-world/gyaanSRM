import React from "react";
import Lottie from "lottie-react";
import StudyTag from "@/components/utils/StudyTag.json";

export default function Dashboard({ user }: any) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat rounded-lg"
      style={{
        backgroundImage: 'url("/neo.jpg")', // Add your image URL here
      }}
    >
      <div className="bg-customColor-2 border border-black pl-16 pr-16  rounded-lg bg-opacity-70 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side with text */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 text-center text-black lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 mt-4">Hello, {user}!</h1>
          <p className="text-lg mb-4">Let's learning something today</p>
          <p className="text-lg mb-8">Set your study plan and growth with community</p>
        </div>

        {/* Right side with animation */}
        <div className="w-full lg:w-1/2 justify-center mt-8 lg:mt-0 hidden lg:flex">
          <Lottie
            animationData={StudyTag}
            className="relative z-10 h-72"
            style={{ filter: "drop-shadow(3px 3px 3px #555)" }}
          />
        </div>
      </div>
    </div>
  );
}
