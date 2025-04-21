"use client"; // This is already here, confirming it's a client component

import Image from "next/image";
import React, { useEffect, useState } from "react"; // Import useState and useEffect
// Link is imported but not used, can be removed if not needed elsewhere
// import Link from "next/link";
import Card from "@/components/Card";

// Define a type for the course data based on your Mongoose schema (optional but good practice)
interface Course {
  _id: string; // Mongoose document ID
  faculty_id: string; // Assuming ObjectId is represented as string in JSON
  assignment: any[]; // Or define a specific type for assignments if needed
  descripion?: string; // Made optional based on previous logic
  ratings: number;
  courseDuration: number;
  courseName: string;
  courseCode: string;
  enrolledUsers: string[];
  // Add other fields if necessary
}

// Define the structure of the user data stored in localStorage
interface LocalStorageUserData {
  _id: string;
  name: string;
  email: string;
  clerkID: string;
  // Add other fields if present
}

export default function Explore() {
  const [courses, setCourses] = useState<Course[]>([]); // State to store fetched courses
  const [loadingCourses, setLoadingCourses] = useState(true); // State to track loading status for courses
  const [errorCourses, setErrorCourses] = useState<string | null>(null); // State to store any errors fetching courses

  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // State to store the fetched user ID from localStorage

  // useEffect hook to fetch data and user ID when the component mounts
  useEffect(() => {
    // Function to fetch courses
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true); // Set loading to true before fetching
        const response = await fetch("/api/courses/getCourses"); // Fetch from your API route
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch courses');
        }

        if (data.success) {
          setCourses(data.courses); // Update state with fetched courses
        } else {
          setErrorCourses(data.message || 'An unknown error occurred fetching courses');
        }

      } catch (err: any) {
        setErrorCourses(err.message || 'Error fetching courses'); // Catch fetch errors or API errors
        console.error("Fetching courses failed:", err);
      } finally {
        setLoadingCourses(false); // Set loading to false after fetching completes
      }
    };

    // Function to get user ID from localStorage
    const getUserIdFromLocalStorage = () => {
      // Check if localStorage is available (only in browser environment)
      if (typeof window !== 'undefined') {
        const userDataString = localStorage.getItem('edu-cec_user');
        if (userDataString) {
          try {
            const userData: LocalStorageUserData = JSON.parse(userDataString);
            if (userData && userData._id) {
              setCurrentUserId(userData._id); // Set the user ID from localStorage
              console.log("User ID fetched from localStorage:", userData._id);
            } else {
              console.warn("localStorage 'userData' found but does not contain '_id' or is invalid.");
              setCurrentUserId(null); // Ensure user ID is null if _id is missing
            }
          } catch (error) {
            console.error("Error parsing localStorage 'userData':", error);
            setCurrentUserId(null); // Ensure user ID is null on parsing error
          }
        } else {
          console.log("localStorage 'userData' item not found.");
          setCurrentUserId(null); // Ensure user ID is null if item is not found
        }
      } else {
        console.log("localStorage is not available.");
        setCurrentUserId(null); // Ensure user ID is null in non-browser environments
      }
    };

    // Fetch courses and get user ID when the component mounts
    fetchCourses();
    getUserIdFromLocalStorage();

  }, []); // Empty dependency array means this effect runs only once on mount

  const isLoading = loadingCourses; // Loading state only depends on courses fetching now
  const hasError = errorCourses; // Error state only depends on courses fetching now

  return (
    <div className="relative min-h-screen w-full bg-customColor-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        {/* Heading Section */}
        <div className="m-3 flex flex-col lg:flex-row lg:justify-center text-left lg:text-left">
          <div className="lg:w-1/2 relative">
            <h1 className="text-3xl font-extrabold text-center text-black tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              <div className="relative inline-block">
                <span className="z-10">
                 The{" "}
                    <span className="text-customColor-5 bg-customColor-2 rounded-full px-3">
                      courses
                    </span>
                    <br />
                    we offer!
                </span>
              </div>
            </h1>
            {/* Note: The scribble image absolute positioning might need adjustments depending on parent elements */}
            <Image
              src="/scribble.svg"
              alt="Decoration"
              width={100}
              height={120}
              className="absolute h-full hidden lg:block"
              style={{
                transform: "translate(800%, -140%) rotate(90deg)",
                zIndex: 0,
              }}
            />
          </div>
        </div>

        {/* Grid Layout for Cards with Fixed Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {isLoading && (
            <div className="col-span-full flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customColor-5"></div>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="col-span-full text-center text-red-500">
              <p>Error: {hasError}</p>
            </div>
          )}

          {!isLoading && !hasError && courses.length === 0 && (
            <div className="col-span-full text-center text-black">
              <p>No courses available.</p>
            </div>
          )}

          {!isLoading && !hasError && courses.length > 0 && (
            <>
              {courses.map((course) => (
                <div key={course._id} className="w-full h-[400px]">
                  <Card
                    image="/video.svg"
                    heading={course.courseName}
                    text={course.descripion || `★ ${course.ratings} (Reviews not available)`}
                    bText={currentUserId ? "Enroll Now" : "Log In to Enroll"}
                    courseCode={course.courseCode}
                    userId={currentUserId || ""}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}