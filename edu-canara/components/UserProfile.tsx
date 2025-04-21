"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import Loader from './Loader';

export default function UserProfile() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    usn: '',
    college: '',
    year: '',
    section: '',
    admissionDate: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    city: '',
    branch: ''
  });
  const [changeHistory, setChangeHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    axios.get('/api/users/CheckData')
      .then(response => {
        if (response.data.id) {
          setUserId(response.data.id);
        } else {
          throw new Error('No user ID found');
        }
      })
      .catch(error => {
        console.error('Error fetching user ID:', error);
        setTimeout(() => {
          toast.error("Error Fetching user, Kindly Login Again");
        }, 2000);
        router.push('/login');
      });
  }, [router]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(response => {
          const primaryUser = response.data.user;
          const fetchedChangeHistory = response.data.changeHistory;

          let updatedUser = { 
            ...primaryUser
          };

          fetchedChangeHistory.forEach((entry: any) => {
            updatedUser = { ...updatedUser, ...entry.updatedFields };
          });

          setUser(updatedUser);
          setChangeHistory(fetchedChangeHistory);

          const fieldsToCheck = ['firstName', 'college', 'usn', 'year', 'branch'];
          const totalFields = fieldsToCheck.length;
          const emptyFields = fieldsToCheck.filter(field => !updatedUser[field] || updatedUser[field] === 'N/A').length;
          const emptyPercentage = (emptyFields / totalFields) * 100;

          setShowWarning(emptyPercentage > 50);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          router.push('/login');
        });
    }
  }, [userId, router]);

  if (loading) {
    return <Loader />; // Show loader when loading state is true
  }

  return (
    <div className="min-h-screen mx-auto p-6 bg-card rounded-lg shadow-md">
      
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>

      <div className="flex items-center mb-6">
        <Image
          src="/krishna1.jpg"
          alt="Student Profile Picture"
          width={100}
          height={100}
          className="rounded-full object-cover m-3 border-black border-2"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />

        <div>
          <h3 className="text-xl font-semibold ml-4">{user.username || 'N/A'}</h3>
          <p className="text-muted-foreground ml-4">ID: {userId || 'N/A'}</p>
          {userId && (
            <div className="ml-4 flex items-center mt-2">
              <Link href={`/edit/${userId}`}>
                <button className="inline-flex w-30 font-semibold items-center justify-center bg-[#d0f0e4] border-black border-2 p-2 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg">
                  Edit Profile
                </button>
              </Link>
              {showWarning && (
                <p className="ml-4 text-sm text-red-600">Profile empty, please fill it!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='border-2 border-black bg-white shadow-black shadow-sm rounded-lg p-4'>
        <h2 className='font-bold underline'>Personal Information</h2>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="block text-sm font-medium"><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
          </div>
          <div>
            <p className="block text-sm font-medium"><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toDateString() : 'N/A'}</p>
          </div>
          <div>
            <p className="block text-sm font-medium"><strong>Email:</strong> {user.email || 'N/A'}</p>
          </div>          
          <div>
            <p className="block text-sm font-medium"><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className='border-2 border-black bg-white shadow-black shadow-sm rounded-lg mt-4 p-4'>
        <h2 className='font-bold underline'>Educational Information</h2>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="block text-sm font-medium"><strong>Year:</strong> {user.year || 'N/A'}</p>
          </div>
          <div>
            <p className="block text-sm font-medium"><strong>Branch:</strong> {user.branch || 'N/A'}</p>
          </div>
          <div>
            <p className="block text-sm font-medium"><strong>USN:</strong> {user.usn || 'N/A'}</p>
          </div>
          <div>
            <p className="block text-sm font-medium"><strong>College:</strong> {user.college || 'N/A'}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
