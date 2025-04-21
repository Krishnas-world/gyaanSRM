"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Calendar } from './ui/calendar';
import { toast } from 'sonner';

interface User {
  username: string;
  firstName: string;
  college: string;
  usn: string;
  year: string;
  section: string;
  dob: string;
  phone: string;
  email: string;
  address?: string;
  country?: string;
  city?: string;
  branch?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const { id } = useParams(); // Accessing route parameters
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    college: '',
    usn: '',
    year: '',
    section: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    city: '',
    branch: '',
  });
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCollege, setCustomCollege] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');

  const years = [
    '1st Year | Beginners',
    '2nd Year | Learners',
    '3rd Year | Explorers',
    '4th Year | Pioneers',
    'Other'
  ];
  const branchOptions = [
    'CSE',
    'ISE',
    'AIML',
    'CSBS',
    'CSD',
    'Other'
  ];

  const colleges = [
    "CANARA ENGINEERING COLLEGE",
    "ACS COLLEGE OF ENGINEERING, BANGALORE",
    "ADARSHA INSTITUTE OF TECHNOLOGY, BANGALORE",
    "AGM RURAL ENGINEERING COLLEGE",
    "AKSHAYA INSTITUTE OF TECHNOLOGY, TUMKUR",
    "AMRUTHA INSTITUTE OF ENGINEERING, BENGALURU",
    "ANGADI INSTITUTE OF TECHNOLOGY AND MANAGEMENT, BELGAUM",
    "ANJUMAN INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    "APS COLLEGE OF ENGINEERING",
    "ATME COLLEGE OF ENGINEERING, MYSORE",
    "ACHUTTHA INSTITUTE OF TECHNOLOGY",
    "ALPHA COLLEGE OF ENGINEERING",
    "B.L.D.E.A'S V.P.DR.P.G.HALLAKATTI COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "BVB , HUBLI",
    "BALLARI INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    "BASAVAKALYANA ENGINEERING COLLEGE, BIDAR",
    "BASAVESHWARA ENGINEERING COLLEGE",
    "BGMIT MUDHOL",
    "BITS PILANI, GOA",
    "BMS COLLEGE OF ENGINEERING, BANGALORE",
    "BMS INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    "BTL INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    "BANGALORE TECHNOLOGICAL INSTITUTE, KODATHI",
    "BHEEMANNA KHANDRE INSTITUTE OF TECHNOLOGY, BIDAR",
    "BYRE GOWDA INSTITUTE OF TECHNOLOGY",
    "CAUVERY INSTITUTE OF TECHNOLOGY, MANDYA",
    "CMR INSTITUTE OF TECHNOLOGY, BANGALORE",
    "CAMBRIDGE INSTITUTE OF TECHNOLOGY BASAVANAPURA, BANGALORE",
    "CHANNABASAWESHWARA INSTITUTE OF TECHNOLOGY",
    "CITY ENGINEERING",
    "CANARA PRE UNIVERSITY",
    "DR. AMBEDKAR INSTITUTE OF TECHNOLOGY, BANGALORE",
    "DAYANAND SAGAR COLLEGE OF ENGINEERING KANAKAPUR, BANGALORE",
    "DAYANANDA SAGAR ACADEMY OF TECHNOLOGY",
    "EAST POINT COLLEGE OF ENGINEERING, BANGALORE",
    "EAST WEST INSTITUTE OF TECHNOLOGY",
    "G MADEGOWDA INSTITUTE OF TECHNOLOGY, MANDYA",
    "GIRIJABAL SAIL INSTITUTE OF TECHNOLOGY",
    "GLOBAL ACADEMY OF TECHNOLOGY",
    "GOPALAN COLLEGE OF ENGINEERING AND MANAGEMENT",
    "GOVERNMENT ENGINEERING COLLEGE, HASSAN",
    "GOVERNMENT ENGINEERING COLLEGE, CHAMRAJNAGAR",
    "GOVERNMENT ENGINEERING COLLEGE, MANDYA",
    "H K B K COLLEGE OF ENGINEERING, BANGALORE",
    "HKE'S SLN COLLEGE OF ENGINEERING (HKES), RAICHUR",
    "HIRASAGAR INSTITUTE OF TECHNOLOGY, BELAGAVI",
    "JAIN INSTITITE OF TECHNOLOGY, DAVANGERE",
    "JYOTHY INSTITUTE OF TECHNOLOGY, BANGALORE",
    "SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY AND MANAGEMENT BANTAKAL",
    "JAIN INSTITUTE TECHNOLOGY",
    "JYOTHI INSTITUTE OF TECHNOLOGY",
    "K.L.E.DR.M S SHESHAGIRI COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "K.S. SCHOOL OF ENGINEERING AND MANAGEMENT",
    "KCT ENGINEERING COLLEGE",
    "KLE TECHNOLOGICAL UNIVERSITY",
    "KLS VISHWANATHRAO DESHPANDE INSTITUTE OF TECHNOLOGY",
    "KVG COLLEGE OF ENGINEERING",
    "KHAJA BANDA NAWAZ COLLEGE OF ENGINEERING, GULBARGA",
    "LINGARAJAPPA ENGINEERING COLLEGE",
    "M.S RAMAIAH INSTITUTE OF TECHNOLOGY, BANGALORE",
    "MADHAV PAI MEMORIAL COLLEGE - MANIPAL",
    "MAHARAJA INSTITUTE OF TECHNOLOGY",
    "MALNAD COLLEGE OF ENGINEERING, HASSAN",
    "MYSORE COLLEGE OF ENGINEERING AND MANAGEMENT",
    "MYSURU ROYAL INSTITUTE OF TECHNOLOGY",
    "NDRK INSTITUTE OF TECHNOLOGY",
    "NEW HORIZON COLLEGE OF ENGINEERING, BANGALORE",
    "NIE INSTITUTE OF TECHNOLOGY",
    "PDA COLLEGE OF ENGINEERING, GULBARGA",
    "PES COLLEGE OF ENGINEERING, MANDYA",
    "PES INSTITUTE OF TECHNOLOGY AND MANAGEMENT, SHIVAMOGA",
    "PNS INSTITUTE OF TECHNOLOGY, BANGALORE",
    "R.L. JALAPPA INSTITUTE OF TECHNOLOGY",
    "R.V. COLLEGE OF ENGINEERING, BANGALORE",
    "RAGIV GANDHI INSTITUTE OF TECHNOLOGY",
    "RAMAIAH UNIVERSITY OF APPLIED SCIENCE, BANGALORE",
    "RNS INSTITUTE OF TECHNOLOGY",
    "REVA UNIVERSITY, BANGALORE",
    "RAO BAHADUR ENGINEERING COLLEGE, BELLARY",
    "S.E.A COLLEGE OF ENGINEERING AND TECHNOLOGY, BANGALORE",
    "SAHYADRI COLLEGE OF ENGINEERING & MANAGEMENT",
    "SDM INSTITUTE OF TECHNOLOGY, UJIRE",
    "SJB INSTITUTE OF TECHNOLOGY",
    "SRI DHARMASTHA MANJUNATHESHWARA COLLEGE OF ENGINEERING",
    "SRI JAYACHAMARAJENDRA COLLEGE OF ENGINEERING, JSSTI CAMPUS, MYSORE",
    "SRI SIDDARTHA INSTITUTE OF TECHNOLOGY",
    "SRI TARALABALU JAGADGURU INSTITUTE OF TECHNOLOGY",
    "SRI VINAYAKA INSTITUTE OF TECHNOLOGY",
    "SRINIVAS INSTITUTE OF TECHNOLOGY, VALACHIL",
    "SRINIVAS INSTITUTE OF TECHNOLOGY, MUKKA",
    "THE NATIONAL INSTITUTE OF ENGINEERING MANSNDAVADI, MYSORE",
    "TONTADARYA COLLEGE OF ENGINEERING",
    "UNIVERSITY VISVESWARAIAH COLLEGE OF ENGINEERING, BANGALORE",
    "VIJAYA VITTALA INSTITUTE OF TECHNOLOGY, BANGALORE",
    "VIVEKANANDA COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "KVG COLLEGE OF ENGINEERING, SULLYA",
    "VCET PUTTUR",
    "ALVA'S INSTITUTE OF ENGINEERING AND TECHNOLOGY, MOODBIDRI",
    "MANGALORE INSTITUTE OF TECHNOLOGY AND ENGINEERING, MOODBIDRI",
    "YENEPOYA INSTITUTE OF TECHNOLOGY",
    "ST JOSEPH'S ENGINEERING COLLEGE",
    "SHREE DEVI INSTITUTE OF TECHNOLOGY, KENJAR, MANGALORE",
    "SHRIDEVI INSTITUTE OF ENGINEERING AND TECHNOLOGY, HASSAN",
    "KARAVALI INSTITUTE OF TECHNOLOGY",
    "SAHYADRI INSTITUTE OF TECHNOLOGY",
    "BEARY'S INSTITUTE OF TECHNOLOGY",
    "PA COLLEGE OF ENGINEERING",
    "NITK SURATHKAL",
    "A J INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    "MANIPAL INSTITUTE OF TECHNOLOGY, MANIPAL",
    "MIT KUNDAPURA, MOODALKATTE",
    "SIR M. VISVESVARAYA INSTITUTE OF TECHNOLOGY, BENGALURU",
    "JAWARHARLAL NEHRU NATIONAL COLLEGE OF ENGINEERING, SHIVAMOGGA",
    "CET TRIVANDRUM ENGINEERING COLLEGE",
    "NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY, BANGALORE",
    "DAYANAND SAGAR COLLEGE OF ENGINEERING, BANGALORE",
    "REVA INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    "DON BOSCO INSTITUTE OF TECHNOLOGY, BANGALORE",
    "BANGALORE BGS INSTITUTE OF TECHNOLOGY",
    "ACHARYA INSTITUTE OF TECHNOLOGY",
    "HKBK COLLEGE OF ENGINEERING",
    "PRESIDENCY COLLEGE OF ENGINEERING",
    "SAI VIDYA INSTITUTE OF TECHNOLOGY",
    "VISVESVARAYA TECHNOLOGICAL UNIVERSITY, BELAGAVI",
    "GSSS INSTITUTE OF ENGINEERING & TECHNOLOGY",
    "VIDYAVARDHAKA COLLEGE OF ENGINEERING",
    "VIDYA VIKAS INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    "JSS SCIENCE AND TECHNOLOGY UNIVERSITY, MYSORE",
    "GOVERNMENT ENGINEERING COLLEGE, KUSHALNAGAR",
    "MANGALORE MARINE COLLEGE",
    "NIT TRICHY",
    "NAGARJUNA COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "STJ INSTITUTE OF TECHNOLOGY, RANEBENNUR",
    "SAMPOORNA INSTITUTE OF TECHNOLOGY",
    "SAPTHAGIRI COLLEGE OF ENGINEERING",
    "SHA SHIB COLLEGE OF ENGINEERING",
    "SHEIKH COLLEGE OF ENGINEERING",
    "SHETTY INSTITUTE OF TECHNOLOGY",
    "SHIVAGANGA INSTITUTE OF TECHNOLOGY",
    "SHREE VIJAY VIDYA INSTITUTE OF TECHNOLOGY",
    "ST. JOSEPH'S INSTITUTE OF TECHNOLOGY"
  ];

  useEffect(() => {
    axios.get(`/api/users/${id}`) // Fetching user data based on the id from the URL
      .then(response => {
        setUser(response.data.user);
        setLoading(false);
        if (response.data.dob) {
          setSelectedDate(new Date(response.data.dob));
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        router.push('/login'); // Redirecting to login if there's an error
      });
  }, [id, router]);

  const closeAllDropdowns = () => {
    setIsDropdownOpen(false);
    setIsBranchDropdownOpen(false);
    setIsCalendarOpen(false);
    setIsCollegeDropdownOpen(false);
  };

  const handleGradeChange = (value: string) => {
    setUser(prev => ({ ...prev, year: value }));
    closeAllDropdowns();
  };

  const toggleDropdown = () => {
    closeAllDropdowns();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBranchChange = (value: string) => {
    setUser(prev => ({ ...prev, branch: value }));
    closeAllDropdowns();
  };

  const toggleBranchDropdown = () => {
    closeAllDropdowns();
    setIsBranchDropdownOpen(!isBranchDropdownOpen);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setUser(prev => ({ ...prev, dob: date.toISOString().split('T')[0] }));
      closeAllDropdowns();
    }
  };

  const toggleCalendar = () => {
    closeAllDropdowns();
    setIsCalendarOpen(!isCalendarOpen);
  };

  const filteredColleges = colleges.filter(college =>
    college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCollege = () => {
    setIsCollegeDropdownOpen(!isCollegeDropdownOpen);
  };

  const handleCollegeChange = (college: any) => {
    if (college === 'Other') {
      setShowCustomInput(true);
    } else {
      setSelectedCollege(college);
      setShowCustomInput(false);
      setIsCollegeDropdownOpen(false);
    }
    setUser(prev => ({ ...prev, college }));
  };

  const handleCustomCollegeChange = (e: any) => {
    setCustomCollege(e.target.value);
  };

  const handleCustomCollegeSubmit = () => {
    setSelectedCollege(customCollege);
    setCustomCollege('');
    setShowCustomInput(false);
    setIsCollegeDropdownOpen(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields: (keyof typeof user)[] = ['username', 'firstName', 'college', 'usn', 'year', 'section', 'dob', 'phone', 'email'];
    
    // Ensure TypeScript understands that field is a key of user
    const isValid = requiredFields.every(field => user[field] !== '');
  
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }
  
    try {
      await axios.put(`/api/users/${id}`, user);
      toast.success('Profile updated, redirecting to profile...');
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
    }
  }
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen  mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

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
          <h3 className="text-xl font-semibold ml-4">{user.username}</h3>
          <p className="text-muted-foreground ml-4">ID: {id}</p>
          <button className="ml-4 mt-2 inline-flex w-30 font-semibold items-center justify-center bg-[#d0f0e4] border-black border-2 p-2 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg">Change Password</button>
        </div>
      </div>

      <div>
        <h2 className='font-bold underline'>Personal Information</h2>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name <span className='text-red-500 font-bold'> * </span>:</label>
            <input
              className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              maxLength={25}
              defaultValue={user?.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value.toUpperCase() })}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium">College:</label>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 border-black border-2 focus:outline-none focus:bg-[#79F7FF] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              onClick={toggleCollege}
              aria-expanded={isCollegeDropdownOpen}
            >
              {selectedCollege || 'Select College'}
              <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isCollegeDropdownOpen && (
              <div className="w-full absolute right-0 z-10 mt-2 bg-white shadow-lg border border-black">
                <input
                  type="text"
                  className="w-full px-3 py-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF]"
                  placeholder="Search College"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul className="py-2 max-h-56 overflow-y-auto">
                  {filteredColleges.map((college) => (
                    <li
                      key={college}
                      className="px-3 py-2 cursor-pointer hover:bg-[#79F7FF] focus:bg-[#79F7FF]"
                      onClick={() => handleCollegeChange(college)}
                    >
                      {college}
                    </li>
                  ))}
                  <li
                    key="Other"
                    className="px-3 py-2 cursor-pointer hover:bg-[#79F7FF] focus:bg-[#79F7FF]"
                    onClick={() => handleCollegeChange('Other')}
                  >
                    Other
                  </li>
                </ul>
              </div>
            )}
            {showCustomInput && (
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF]"
                  placeholder="Enter College Name"
                  value={customCollege}
                  onChange={handleCustomCollegeChange}
                />
                <button
                  className="w-full mt-2 bg-[#d0f0e4] border-black border-2 p-2 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg"
                  onClick={handleCustomCollegeSubmit}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">USN <span className='text-red-500 font-bold'> * </span>:</label>
            <input
              className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              type="text"
              placeholder="USN"
              name="usn"
              id="usn"
              maxLength={15}
              value={user.usn}
              onChange={(e) => setUser({ ...user, usn: e.target.value.toUpperCase() })}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium">Year <span className='text-red-500 font-bold'> * </span>:</label>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 border-black border-2 focus:outline-none focus:bg-[#79F7FF] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              {user.year || 'Select Year'}
              <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-full bg-white shadow-lg border border-black">
                <ul className="py-2 max-h-56 overflow-y-auto">
                  {years.map((year) => (
                    <li
                      key={year}
                      className="px-3 py-2 cursor-pointer hover:bg-[#79F7FF] focus:bg-[#79F7FF]"
                      onClick={() => handleGradeChange(year)}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium">Branch <span className='text-red-500 font-bold'> * </span>:</label>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 border-black border-2 focus:outline-none focus:bg-[#79F7FF] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              onClick={toggleBranchDropdown}
              aria-expanded={isBranchDropdownOpen}
            >
              {user.branch || 'Select Branch'}
              <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isBranchDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-full bg-white shadow-lg border border-black">
                <ul className="py-2 max-h-56 overflow-y-auto">
                  {branchOptions.map((branch) => (
                    <li
                      key={branch}
                      className="px-3 py-2 cursor-pointer hover:bg-[#79F7FF] focus:bg-[#79F7FF]"
                      onClick={() => handleBranchChange(branch)}
                    >
                      {branch}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Section <span className='text-red-500 font-bold'> * </span>:</label>
            <input
              className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              type="text"
              placeholder="Section"
              name="section"
              id="section"
              maxLength={5}
              value={user.section}
              onChange={(e) => setUser({ ...user, section: e.target.value })}
              required
            />
          </div>
        </div>
        <div className='grid pt-2 grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 border-black border-2 focus:outline-none focus:bg-[#79F7FF] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              onClick={toggleCalendar}
            >
              {selectedDate ? selectedDate.toDateString() : 'Select Date'}
              <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isCalendarOpen && (
              <div
                className="absolute z-20 mt-2 w-[320px] shadow-md border-black bg-white border-2"
                role="dialog"
                aria-labelledby="calendar"
              >
                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onDayClick={handleDateSelect}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <h2 className='font-bold underline'>Contact Details</h2>
      <br />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className="block text-sm font-medium">Contact<span className='text-red-500 font-bold'> * </span>:</label>
          <input
            className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            type="text"
            placeholder="Contact Number"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email<span className='text-red-500 font-bold'> * </span>:</label>
          <input
            className="w-full cursor-not-allowed border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#79F7FF] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            disabled={true}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-[#d0f0e4] w-full border-black border-2 p-2 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-lg"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
