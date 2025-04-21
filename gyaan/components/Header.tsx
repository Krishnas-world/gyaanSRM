"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

const menuItems = [
  { name: "Home", href: "/#" },
  { name: "Explore", href: "/explore" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check for token and fetch user data
    axios.get('/api/users/CheckData')
      .then(response => {
        if (response.data.id) {
          return axios.get(`/api/users/${response.data.id}`);
        } else {
          throw new Error('No user ID found');
        }
      })
      .then(response => {
        const primaryUser = response.data.user;
        setUsername(primaryUser.username); // Set the username
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      toast.success("Logout Success");
      window.location.href = '/';
    } catch (error) {
      toast.error("Logout Failed");
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative w-full bg-customColor-1 text-1xl p-1 z-20" id="hero-one">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link className="cursor-pointer" href='/#'>
            <Image src='/logo1.png' alt="Logo" width={140} height={10} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-md font-semibold text-gray-800 hover:text-gray-900">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center space-x-4 relative">
          {username ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-md font-semibold text-black p-2"
              >
                Welcome, {username} <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black border-2 border-black shadow-lg rounded-lg z-50">
                  <Link href="/profile" className="block px-4 py-2 text-black hover:bg-[#79F7FF] hover:text-black rounded-t-lg active:bg-[#00E1EF]">
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-[#79F7FF] hover:text-black rounded-b-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/register">
              <button className="h-12 font-semibold w-36 border-black border-2 p-2.5 bg-[#d0f0e4] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full">
                Login/Register
              </button>
            </Link>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition text-black lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">Gyaan</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-md font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                {username ? (
                  <div className="relative mt-4">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-md font-bold text-black p-2"
                    >
                      Welcome, {username} <ChevronDown className="ml-2 h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-black border-2 border-black shadow-lg rounded-lg z-50">
                        <Link href="/profile" className="block px-4 py-2 text-black hover:bg-[#79F7FF] hover:text-black rounded-t-lg active:bg-[#00E1EF]">
                          Profile
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-black hover:bg-[#79F7FF] hover:text-black rounded-b-lg"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/register">
                    <button className="h-12 font-semibold w-36 border-black border-2 p-2.5 bg-[#d0f0e4] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full">
                      Login/Register
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
