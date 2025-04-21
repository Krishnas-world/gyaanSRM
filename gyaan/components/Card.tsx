'use client'; // Ensure this is a client component

import Image from 'next/image';
import Link from 'next/link'; // Keep Link if used elsewhere, though not for the button click handler
import React, { useState } from 'react'; // Import useState
import { Button } from './ui/button'; // Assuming this is your Shadcn Button component

interface CardProps {
  image?: string;
  text?: string;
  heading?: string;
  bText?: string;
  courseCode: string; // Add courseCode prop - required for enrollment
  userId: string; // Add userId prop - required for enrollment
}

const Card: React.FC<CardProps> = ({
  image = '/medal.svg', // Default image if none provided
  heading = 'Default Heading', // Default heading
  text = 'Default Description', // Default text
  bText = 'Enroll Now', // Default button text
  courseCode, // Get courseCode from props
  userId, // Get userId from props
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false); // State to manage loading/disabling button
  const [enrollmentMessage, setEnrollmentMessage] = useState<string | null>(null); // State for feedback message

  const handleEnrollClick = async () => {
    if (isEnrolling) return; // Prevent multiple clicks

    setIsEnrolling(true); // Set loading state
    setEnrollmentMessage(null); // Clear previous message

    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseCode, userId }), // Send courseCode and userId
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEnrollmentMessage('Enrollment successful!');
        // Optional: Trigger UI update in parent (Explore) or change button state to "Enrolled"
        console.log('Enrollment successful:', data);
      } else {
        // Use the specific error message from the backend if available
        setEnrollmentMessage(data.message || 'Enrollment failed. Please try again.');
        console.error('Enrollment failed:', data.message);
      }
    } catch (error) {
      setEnrollmentMessage('An error occurred during enrollment.');
      console.error('Fetch error during enrollment:', error);
    } finally {
      setIsEnrolling(false); // Reset loading state
      // You might want to clear the message after a few seconds
      setTimeout(() => setEnrollmentMessage(null), 5000); // Clear message after 5 seconds
    }
  };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full border-black border-2 rounded-xl hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all bg-customColor-6 relative overflow-hidden">
        <Image
          src="/squiggle.png"
          alt="Decoration"
          width={150}
          height={150}
          className="absolute z-0 opacity-50"
          style={{
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%) rotate(-30deg) scale(1.5)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex flex-col">
            <figure className="flex-none py-4 flex justify-center items-center">
              <Image
                src={image}
                alt="Course thumbnail"
                className="object-cover rounded-md"
                width={90}
                height={90}
              />
            </figure>
            <div className="flex-1 px-6 py-4 flex flex-col">
              <h1 className="text-2xl font-semibold mb-2 line-clamp-2">{heading}</h1>
              <p className="text-sm flex-1 mb-4 font-normal line-clamp-3">
                {text}
              </p>
              <div className="flex-none">
                <Button
                  onClick={handleEnrollClick}
                  disabled={isEnrolling}
                  className='w-full border border-customColor-5 bg-customColor-6 text-customColor-5 hover:border-customColor5 p-2 rounded-full hover:bg-customColor-5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isEnrolling ? 'Enrolling...' : bText}
                </Button>
                {enrollmentMessage && (
                  <p className={`mt-2 text-sm text-center ${enrollmentMessage.includes('success') ? 'text-green-600' : enrollmentMessage.includes('failed') ? 'text-red-600' : 'text-gray-800'}`}>
                    {enrollmentMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;