"use client"
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const scrollToHeroOne = () => {
    const heroOneElement = document.getElementById('hero-one');
    if (heroOneElement) {
      heroOneElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-customColor-1 py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">

          <Link className="cursor-pointer mb-4 md:mb-0" href='/#'>
            <Image src='/logo1.png' alt="Logo" width={120} height={40} className="w-32 h-auto" />
          </Link>

          <div className="w-full md:w-auto p-4">
            <ul className="flex flex-col md:flex-row items-center justify-center">
              <li className="p-2">
                <Link className="font-medium text-black hover:text-gray-700" href='/#'>
                  Home
                </Link>
              </li>
              <li className="p-2">
                <Link className="font-medium text-black hover:text-gray-700" href="/clubs">
                  Clubs
                </Link>
              </li>
              <li className="p-2">
                <Link className="font-medium text-black hover:text-gray-700" href="/goals">
                  Goals
                </Link>
              </li>
            </ul>
            <p className="text-center mt-4 font-montserrat text-sm">
              © EDU-CEC 2024 | <Link href='/team'>Meet the Team</Link>
            </p>
          </div>

          <div className="w-full md:w-auto p-4 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black hover:border-gray-400">
                <Link href="#">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.55736 5.2L5.55736 3.88C5.55736 3.308 5.69631 3 6.66894 3H7.87315V0.800003L6.02052 0.800003C3.70473 0.800003 2.77841 2.252 2.77841 3.88V5.2H0.925781L0.925781 7.4H2.77841L2.77841 14H5.55736L5.55736 7.4H7.59526L7.87315 5.2H5.55736Z"
                      fill="#27272A"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black hover:border-gray-400">
                <Link href="#">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6655 1.39641C13.1901 1.60149 12.6728 1.74907 12.1399 1.80656C12.6931 1.47788 13.1074 0.958619 13.3051 0.346204C12.7859 0.655036 12.2172 0.871595 11.6241 0.986274C11.3762 0.721276 11.0764 0.510168 10.7434 0.366102C10.4104 0.222036 10.0512 0.1481 9.68836 0.148902C8.22024 0.148902 7.03953 1.33893 7.03953 2.79928C7.03953 3.00436 7.06439 3.20943 7.10478 3.40673C4.90649 3.29177 2.94589 2.24155 1.64246 0.633614C1.40495 1.03927 1.2805 1.50117 1.28203 1.97123C1.28203 2.89094 1.74965 3.70191 2.46274 4.17885C2.0425 4.1623 1.63211 4.0468 1.26494 3.84173V3.87435C1.26494 5.16226 2.17533 6.22956 3.38866 6.47502C3.16084 6.5342 2.92649 6.56447 2.69111 6.56513C2.51866 6.56513 2.35554 6.54804 2.19086 6.52474C2.52643 7.57495 3.50362 8.33775 4.66724 8.3626C3.75685 9.07569 2.61654 9.49515 1.37835 9.49515C1.15619 9.49515 0.951119 9.48738 0.738281 9.46253C1.91278 10.216 3.30632 10.651 4.80706 10.651C9.67904 10.651 12.345 6.61484 12.345 3.11155C12.345 2.99659 12.345 2.88162 12.3372 2.76666C12.853 2.38914 13.3051 1.92152 13.6655 1.39641Z"
                      fill="#27272A"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black hover:border-gray-400">
                <Link href="#">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00094 0.360001C6.09046 0.360001 5.85022 0.368801 5.09958 0.402241C4.34894 0.437441 3.83766 0.555361 3.38974 0.729601C2.9199 0.906321 2.49433 1.18353 2.14278 1.54184C1.78468 1.89357 1.50751 2.31909 1.33054 2.7888C1.1563 3.23584 1.0375 3.748 1.00318 4.496C0.969738 5.2484 0.960937 5.48776 0.960937 7.40088C0.960937 9.31224 0.969738 9.5516 1.00318 10.3022C1.03838 11.052 1.1563 11.5633 1.33054 12.0112C1.51094 12.4741 1.75118 12.8666 2.14278 13.2582C2.5335 13.6498 2.92598 13.8909 3.38886 14.0704C3.83766 14.2446 4.34806 14.3634 5.09782 14.3978C5.84934 14.4312 6.0887 14.44 8.00094 14.44C9.91282 14.44 10.1523 14.4312 10.9038 14.3978C11.6544 14.3634 12.165 14.2446 12.6136 14.0704C13.0734 13.8909 13.4683 13.6498 13.8661 13.2582C14.2574 12.8666 14.4965 12.4741 14.6782 12.0112C14.8487 11.5633 14.9631 11.052 14.9939 10.3022C15.0292 9.5516 15.037 9.31224 15.037 7.40088C15.037 5.48776 15.0292 5.2484 14.9939 4.496C14.9631 3.748 14.8487 3.23584 14.6782 2.7888C14.4965 2.31909 14.2574 1.89357 13.8661 1.54184C13.4732 1.18353 13.0484 0.906321 12.5734 0.729601C12.1246 0.555361 11.6131 0.437441 10.868 0.402241C10.1174 0.368801 9.87719 0.360001 8.9674 0.360001H8.00094ZM8.00094 12.5464C6.84299 12.5464 5.88182 11.6344 5.88182 10.3391C5.88182 9.04351 6.84299 8.13156 8.00094 8.13156C9.15838 8.13156 10.1195 9.04351 10.1195 10.3391C10.1195 11.6344 9.15838 12.5464 8.00094 12.5464ZM8.00094 10.5262C7.74768 10.5262 7.52668 10.7472 7.52668 11.0004C7.52668 11.2536 7.74768 11.4746 8.00094 11.4746C8.25428 11.4746 8.47528 11.2536 8.47528 11.0004C8.47528 10.7472 8.25428 10.5262 8.00094 10.5262ZM8.00094 10.5262"
                      fill="#27272A"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
