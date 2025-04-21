"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Book,
  BookOpenText,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock4,
  Globe,
  LayoutDashboard,
  Library,
  LineChart,
  Mail,
  Megaphone,
  MenuSquare,
  Newspaper,
  School,
  Search,
  SquarePercent,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserProfile from "@/components/UserProfile";
import Dashboard from "@/components/Student/Dashboard";
import EnrolledCourses from "@/components/Student/EnrolledCourses";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/Loader";

// Dummy components for other tabs
const StudentsComponent = () => <div>Students Component</div>;
const AssignmentsComponent = () => <div>Assignments Component</div>;
const MentorsComponent = () => <div>Mentors Component</div>;
const ResourcesComponent = () => <div>Resources Component</div>;
const MessagesComponent = () => <div>Messages Component</div>;
const AnalyticsComponent = () => <div>Analytics Component</div>;
const EventsComponent = () => <div>Events Component</div>;
const LibraryComponent = () => <div>Library Component</div>;

// Define the structure of the user data stored in localStorage
interface LocalStorageUserData {
  _id: string;
  username: string;
  firstName?: string;
  usn?: string;
  college?: string;
  year?: string;
  section?: string;
  admissionDate?: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: string;
  country?: string;
  city?: string;
  branch?: string;
}

export default function LayoutComp() {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<LocalStorageUserData>({
    _id: "",
    username: "",
    firstName: "",
    usn: "",
    college: "",
    year: "",
    section: "",
    admissionDate: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    city: "",
    branch: "",
  });
  const [changeHistory, setChangeHistory] = useState<any[]>([]);

  // Fetch user data on page load
  useEffect(() => {
    const storedUserData = localStorage.getItem("edu-cec_user");

    if (storedUserData) {
      // Parse and set the user data if already in localStorage
      const user = JSON.parse(storedUserData);
      setUsername(user.username);
      setUserId(user._id);
    } else {
      // Fetch data from the API if not available in localStorage
      axios
        .get("/api/users/CheckData")
        .then((response) => {
          if (response.data.id) {
            return axios.get(`/api/users/${response.data.id}`);
          } else {
            throw new Error("No user ID found");
          }
        })
        .then((response) => {
          const user = response.data.user;
          setUsername(user.username);
          setUserId(user._id);
          localStorage.setItem("edu-cec_user", JSON.stringify(user));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          router.push("/login");
        });
    }
  }, [router]);

  // Fetch and update all details in local storage
  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/users/${userId}`)
        .then((response) => {
          const primaryUser = response.data.user;
          const fetchedChangeHistory = response.data.changeHistory;

          // Extract only the `updatedFields` from the latest `changeHistory` entry
          const latestUpdatedFields = fetchedChangeHistory.length
            ? fetchedChangeHistory[fetchedChangeHistory.length - 1].updatedFields
            : {};

          // Save only `latestUpdatedFields` to localStorage
          if (Object.keys(latestUpdatedFields).length > 0) {
            localStorage.setItem("userdata", JSON.stringify(latestUpdatedFields));
          }

          // Set state
          setUser({ ...primaryUser, ...latestUpdatedFields });
          setChangeHistory(fetchedChangeHistory);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          router.push("/login");
        });
    }
  }, [userId, router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Clear localStorage first for immediate UI feedback
      localStorage.removeItem("edu-cec_user");
      localStorage.removeItem("userdata");
      setUserId(null);
      setUsername(null);

      // Then call the logout API
      await axios.post("/api/users/logout");

      toast.success("Logout Success");
      router.push("/");
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Logout failed.");
      router.push("/");
    }
  };

  // Navigation items and their corresponding components
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      component: <Dashboard user={username} />, // Pass username if Dashboard needs it
      isLoading: false,
    },
    {
      name: "Tests",
      icon: Newspaper,
      component: <UserProfile />, // Assuming UserProfile doesn't strictly need userId via prop here, it might fetch its own data
      isLoading: false,
    },
    {
      name: "My Classroom", // Consider renaming this if it's for assignments
      icon: School,
      component: <AssignmentsComponent />,
      isLoading: false,
    },
    {
      name: "Courses", // This will now show enrolled courses
      icon: BookOpenText,
      // Pass the userId prop to the EnrolledCourses component
      component: <EnrolledCourses userId={userId} />,
      isLoading: false,
    },
    {
      name: "Resources",
      icon: Library,
      component: <ResourcesComponent />,
      isLoading: false,
    },
    {
      name: "Announcements",
      icon: Megaphone,
      component: <MessagesComponent />,
      isLoading: false,
    },
    {
      name: "TimeTable",
      icon: Clock4,
      component: <AnalyticsComponent />,
      isLoading: false,
    },
    {
      name: "Events",
      icon: Calendar,
      component: <EventsComponent />,
      isLoading: false,
    },
    {
      name: "Results",
      icon: SquarePercent,
      component: <LibraryComponent />,
      isLoading: false,
    },
  ];

  // Change in params
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Get the current pathname

  const [activeComponent, setActiveComponent] = useState(
    () => {
      const activeTab = searchParams.get("tab");
       // Determine the initial active tab from the URL search parameter
      const initialTab = activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : "Dashboard";

       // Find the corresponding component name in navItems to ensure it's a valid tab
       const validTab = navItems.find(item => item.name.toLowerCase() === initialTab.toLowerCase());

       // Return the valid tab name or default to "Dashboard"
       return validTab ? validTab.name : "Dashboard";
    }
  );

  // Update active component when the search parameter changes
  useEffect(() => {
    const activeTab = searchParams.get("tab");
    const tabName = activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : "Dashboard";

     // Validate the tab name against navItems to prevent rendering issues with invalid tabs
    const validTab = navItems.find(item => item.name.toLowerCase() === tabName.toLowerCase());

    setActiveComponent(validTab ? validTab.name : "Dashboard");

  }, [searchParams]); // Rerun when searchParams change

  const handleNavClick = (itemName: string) => {
     // Update the URL with the new tab query parameter
     // Using router.push with pathname preserves the base path and adds/updates the query param
    router.push(`${pathname}?tab=${itemName.toLowerCase()}`);
    // The useEffect listening to searchParams will handle updating activeComponent and isLoading
  };


  // Find the component to render based on activeComponent state
  const CurrentComponent = navItems.find(
    (item) => item.name === activeComponent
  )?.component;


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 ">
      {/* Sidebar for larger screens */}
      <aside
        className={cn(
          "hidden md:flex flex-col  bg-customColor-1  border-r-2 transition-all duration-300 ease-in-out",
          isSidebarMinimized ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 ">
          {/* Logo - conditionally render based on sidebar state */}
           {!isSidebarMinimized && (
                <Image
                    src="/logo1.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="ml-2"
                />
            )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
            className={cn("ml-auto", { "ml-0": isSidebarMinimized })} // Adjust margin when minimized
          >
            {isSidebarMinimized ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Use a button inside Link for correct hover/active styles */}
                  <Link
                    href={`${pathname}?tab=${item.name.toLowerCase()}`}
                     passHref // Recommended for Link wrapping custom components/elements
                     className={cn(
                        "w-full flex items-center font-semibold justify-start mb-2 py-3 px-4 rounded-lg transition-all duration-200",
                        isSidebarMinimized ? "justify-center" : "justify-start",
                        activeComponent === item.name
                          ? "bg-customColor-6 text-black font-semibold"
                          : "hover:bg-customColor-6 bg-customColor-2 text-gray-700"
                      )}
                    onClick={(e) => {
                        // Prevent default Link behavior if you want handleNavClick to manage navigation
                        // e.preventDefault(); // Only if handleNavClick fully replaces Link's push
                        handleNavClick(item.name);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isSidebarMinimized && (
                      <span className="ml-3 text-sm truncate">{item.name}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isSidebarMinimized && (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <MenuSquare className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          {/* Add logo or header for mobile sidebar if desired */}
           <div className="flex items-center justify-center p-4">
                <Image
                    src="/logo1.png"
                    alt="Logo"
                    width={120}
                    height={40}
                />
           </div>
           <div className="h-px bg-gray-200 my-4"></div> {/* Divider */}
          <nav className="flex flex-col space-y-2 mt-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={activeComponent === item.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                 onClick={() => {
                    handleNavClick(item.name);
                    // Close the sheet after clicking a navigation item
                    const sheetTriggerButton = document.querySelector('.md\\:hidden.fixed.top-4.left-4.z-50') as HTMLButtonElement;
                    if (sheetTriggerButton) {
                        sheetTriggerButton.click(); // Simulate a click on the trigger to close the sheet
                    }
                 }}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Button>
            ))}
          </nav>
           {/* Add logout or profile link in mobile sidebar if desired */}
            {/* <div className="mt-auto p-4 border-t">
                {username ? (
                     <div className="flex items-center justify-between">
                        <span>{username}</span>
                         <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                     </div>
                ) : (
                     <Link href="/login">
                         <Button variant="outline" className="w-full">Login/Register</Button>
                     </Link>
                )}
            </div> */}
        </SheetContent>
      </Sheet>


      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <header className="bg-customColor-1 border-b p-4 flex justify-between items-center"> {/* Added items-center */}
          {/* Search form - hidden on small screens */}
           <form className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-gray-400" /> {/* Adjusted left padding */}
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-64 pl-9" // Adjusted left padding
                />
            </form>


          <div className="flex items-center space-x-4 ml-auto"> {/* Adjusted ml-auto for alignment */}
            {/* Notification Button */}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Profile Dropdown */}
            {username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* Make the trigger a clickable element */}
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                        <Avatar className="h-8 w-8 border-2 border-black">
                            <AvatarImage src="/profile-image.jpg" alt="Profile" />
                             {/* Fallback with first letter of username */}
                            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}> {/* Use router.push for navigation */}
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" passHref> {/* Use passHref with Link around Button */}
                <Button variant="outline">Login/Register</Button>
              </Link>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        {/* Added pt-20 md:pt-0 to account for fixed mobile header if needed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pt-20 md:pt-6">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                {/* Link to Dashboard or Home */}
                 <Link
                    href={`${pathname}?tab=dashboard`} // Link to dashboard tab
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                    onClick={(e) => {
                        // e.preventDefault(); // Only if handleNavClick fully replaces Link's push
                        handleNavClick("Dashboard");
                    }}
                >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Home
                </Link>
              </li>
              {activeComponent !== "Dashboard" && ( // Only show breadcrumb for non-Dashboard tabs
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {activeComponent}
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </nav>

          <section className="flex-1 overflow-auto relative min-h-full"> {/* Removed p-4 from here, added to parent div */}
            {/* Render the active component */}
            {/* Added a key to Suspense to force remounting when activeComponent changes if necessary */}
            <Suspense fallback={<Loader />} key={activeComponent}>
               {/* Conditionally render Loader based on component's own loading state if applicable */}
              {/* For LayoutComp's isLoading (simulated delay), we can wrap the component render */}
               {isLoading ? (
                 <div className="flex items-center justify-center min-h-[300px]"> {/* Add min-height so loader is visible */}
                   <Loader />
                 </div>
               ) : (
                 CurrentComponent // Render the selected component
               )}
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}