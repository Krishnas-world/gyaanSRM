"use client"
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Login () {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log("Sending request with data:", user); // Debugging log
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data); // Debugging log
      toast.success("Login successful");
      setTimeout(() => {
        router.push('/profile/student');
      }, 2000);
    } catch (error: any) {
      console.error("Login Failed", error.response?.data || error.message); // Debugging log
      toast.error("Login Failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <section className="flex h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2">
            <Image src='/logo1.png' width={110} height={60} alt='Logo' />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">Sign In</h2>
          <p className="mt-2 text-base text-gray-600">
            Don't have an account? {' '}
            <Link
              href="/register"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Create an account here!
            </Link>
          </p>
          <form onSubmit={onLogin} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  className="inline-flex w-full font-semibold items-center justify-center bg-[#79F7FF] border-black border-2 p-2.5 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg"
                  type="submit"
                  disabled={buttonDisabled || loading}
                >
                  {loading ? "Logging In..." : "Log In"} <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <Image src="/login.webp" height={400} width={400} alt="Sign Up" className="object-cover w-full h-full" />
      </div>
    </section>
  );
}
