// components/Student/EnrolledCourses.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card'; // Assuming the Card component is in this path

// Define a type for the course data based on your Mongoose schema
interface Course {
  _id: string; // Mongoose document ID
  faculty_id: string; // Assuming ObjectId is represented as string in JSON
  assignment: any[]; // Or define a specific type for assignments if needed
  descripion?: string; // Made optional
  ratings: number;
  courseDuration: number;
  courseName: string;
  courseCode: string;
  enrolledUsers: string[];
  // Add other fields if necessary
}

interface EnrolledCoursesProps {
  userId: string | null; // Accept userId as a prop
}

const EnrolledCourses: React.FC<EnrolledCoursesProps> = ({ userId }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch enrolled courses only if userId is available
    if (userId) {
      const fetchEnrolledCourses = async () => {
        try {
          setLoading(true);
          setError(null); // Clear previous errors

          const response = await fetch(`/api/courses/checkEnrollment?userId=${userId}`);
          const data = await response.json();

          if (!response.ok) {
             // Handle API errors (e.g., 400 for missing userId, 404 for no enrollments, 500)
             // If 404, it means no enrollments, not necessarily an error
            if (response.status === 404) {
                 setEnrolledCourses([]); // No courses found is a valid state
                 console.log(data.message); // Log the "not enrolled" message
            } else {
                throw new Error(data.message || 'Failed to fetch enrolled courses');
            }
          } else {
            if (data.success) {
                setEnrolledCourses(data.courses); // Set the fetched courses
            } else {
                // Handle cases where success is false but status is 200 (unlikely but good practice)
                 setError(data.message || 'An unknown error occurred fetching enrolled courses');
            }
          }

        } catch (err: any) {
          setError(err.message || 'Error fetching enrolled courses.');
          console.error("Fetching enrolled courses failed:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchEnrolledCourses();
    } else {
        // If userId is null, we are not loading and there are no enrolled courses
        setLoading(false);
        setEnrolledCourses([]);
        // Optionally set an error or message indicating the user needs to log in
        // setError("User not logged in. Cannot fetch enrolled courses.");
         console.log("User ID is not available, cannot fetch enrolled courses.");
    }
  }, [userId]); // Rerun effect if userId changes

  if (loading) {
    return <p className="text-center text-black">Loading enrolled courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (enrolledCourses.length === 0) {
    return <p className="col-span-full text-center text-black">You are not enrolled in any courses yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 py-10 justify-items-center">
      {enrolledCourses.map((course) => (
        // Render Card component for each enrolled course
        <Card
          key={course._id}
          image="/video.svg" // Use a suitable default or dynamic image
          heading={course.courseName}
          text={course.descripion || `★ ${course.ratings} (Reviews not available)`}
          bText="View Course" // Button text for enrolled courses
          courseCode={course.courseCode}
          userId={userId || ""} // Pass the userId (though enrollment is done, may be needed for other actions)
          // You might disable the enroll button in the Card if the user is already enrolled
          // Or create a different type of card/button for enrolled courses
        />
      ))}
    </div>
  );
};

export default EnrolledCourses;