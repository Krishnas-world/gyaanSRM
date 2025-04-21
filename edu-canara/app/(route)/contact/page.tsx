"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import contact from '@/components/utils/contact.json';
import Lottie from 'lottie-react';
import React from 'react';

export default function ContactPageOne() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-customColor-1 px-4">
        {/* Hero Map */}
        <div className="mx-auto max-w-7xl py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                <p className="mt-4 text-lg text-black">
                  Our friendly team would love to hear from you.
                </p>
                <form action="" className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-black"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-black"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-black"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-black"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-black"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      id="message"
                      name="message"
                      placeholder="Leave us a message"
                      rows={4}
                    />
                  </div>
                  <button className="h-12 font-semibold w-full sm:w-36 mt-4 bg-[#d0f0e4] border-black border-2 p-2.5 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg lg:m-0">
                    <span className="font-bold text-black">Send</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Lottie
                animationData={contact}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
