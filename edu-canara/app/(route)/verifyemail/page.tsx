"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // Function to verify the user
    const verifyUser = async () => {
        try {
            console.log("Sending token to API:", token); // Debugging log
            const response = await axios.post("/api/user/verifyemail", { token });
            console.log("API Response:", response.data); // Debugging log

            if (response.status === 200) {
                setVerified(true);
                setError(false);
            } else {
                setVerified(false);
                setError(true);
            }
        } catch (error: any) {
            console.error("API Error:", error.response?.data || error.message); // Debugging log
            setVerified(false);
            setError(true);
        }
    }

    // Extract token from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        setToken(urlToken || "");
    }, []);

    // Verify user when token changes
    useEffect(() => {
        if (token.length > 0) {
            verifyUser();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-customColor-1 text-black">
                {token ? `Token: ${token}` : "No Token"}
            </h2>
            {verified && !error && (
                <div>
                    <h2 className="text-green-500">Verified</h2>
                    <Link href="/login">
                        <a className="text-blue-500">Login Here</a>
                    </Link>
                </div>
            )}
            {error && !verified && (
                <div>
                    <h2 className="text-red-500">Error</h2>
                </div>
            )}
        </div>
    );
}
