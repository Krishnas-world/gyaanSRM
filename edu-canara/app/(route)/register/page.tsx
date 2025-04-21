"use client";
import Loader from '@/components/Loader';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Register() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true); // Default to true
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState("");

    const onSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            setLoading(true);
            const response = await axios.post("/api/users/register", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful! Redirecting to login...");
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error("Signup Failed. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const validateUsername = (value: string) => {
        const usernameRegex = /^(?=.*[\d_])[a-zA-Z\d_]{3,}$/;
        if (!usernameRegex.test(value)) {
            setUsernameError("Username must be at least 3 characters long and contain at least one digit or underscore.");
            return false;
        }
        setUsernameError("");
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'username') {
            validateUsername(value);
        }

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'username') {
            validateUsername(value);
        }
    };

    return (
        <section className="flex h-screen">
            {loading ? <Loader /> :
                <>
                    {/* Left Side - Image */}
                    <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
                        <Image src="/login.webp" height={400} width={400} alt="Sign Up" className="object-cover w-full h-full" />
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex items-center justify-center w-full md:w-1/2 bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <div className="mb-2">
                                <Image src='/logo1.png' width={110} height={60} alt='Logo' />
                            </div>
                            <h2 className="text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
                            <p className="mt-2 text-base text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    title=""
                                    className="font-medium text-black transition-all duration-200 hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                            <form onSubmit={onSignup} className="mt-8">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="username" className="text-base font-medium text-gray-900">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className={`w-full border-2 p-2.5 focus:outline-none ${usernameError ? 'border-red-500' : 'border-black'} focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                                value={user.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-base font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                value={user.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                value={user.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className={`inline-flex w-full font-semibold items-center justify-center border-black border-2 p-2.5 rounded-lg ${buttonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#79F7FF] hover:bg-[#79F7FF] active:bg-[#00E1EF]'} ${loading ? 'opacity-50' : ''}`}
                                            type="submit"
                                            disabled={buttonDisabled || loading}
                                        >
                                            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2" size={20} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </section>
    );
}
