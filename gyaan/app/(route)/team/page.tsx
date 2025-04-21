import Image from "next/image";
import Header from "@/components/Header";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
const Team = () => {
  const teamMembers = [
    {
      name: "Krishna H Pallan",
      role: "Full Stack Developer & Club Advisor, Coding Club",
      image: "/krishna1.webp",
      instagram: "https://www.instagram.com/krishnasworld._/",
      linkedin: "https://linkedin.com/in/krishnapallan",
      github: "https://github.com/Krishnas-world",
    },
    {
      name: "Sakshath Rai K",
      role: "AI & Club Advisor, Coding Club",
      image: "/sak.webp",
      instagram: "https://www.instagram.com/sakshath_rai/",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Pavin",
      role: "Backend Developer",
      image: "/pavin.webp",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Deepak D Nayak",
      role: "Designer and Developer, Coding Club",
      image: "/deepak.webp",
      instagram: "https://www.instagram.com/starman_05/",
      linkedin: "http://www.linkedin.com/in/-deepak-nayak-",
      github: "https://github.com/deepakdnayak",
    },
    {
      name: "Varun",
      role: "Frontend Developer, Coding Club",
      image: "/varun.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Abhishek Naik",
      role: "UI and Technical Support, Coding Club",
      image: "/abhishek.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Vaibhav",
      role: "UI and Technical Support, Coding Club",
      image: "/vaibhav.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Anirudha Udupa",
      role: "App Development Lead, Coding Club",
      image: "/anirudha.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },

    {
      name: "P. Rethi Kumaar",
      role: "App Developer, Coding Club",
      image: "/rethi.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
    {
      name: "Navaneeth Arya",
      role: "App Developer, Coding Club",
      image: "/navaneeth.webp",
      instagram: "https://instagram.com/sakshath",
      linkedin: "https://www.linkedin.com/in/sakshath-rai-k/",
      github: "https://github.com/sakshathrai",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <Header />

      {/* Breadcrumb Navigation */}

      {/* Team Section */}
      <div className="p-6 md:p-12 lg:p-15">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider text-center mb-12 lg:mb-20">
          Meet The Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black p-8 hover:shadow-[10px_10px_0px_#000000] transition duration-300 transform hover:scale-105"
            >
              <div className="relative h-96 w-full mb-6 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="border-4 border-black"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl lg:text-2xl font-bold">
                  {member.name}
                </h2>
                <div className="flex space-x-4">
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaInstagram className="text-pink-500" size={24} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-gray-600"
                    >
                      <FaGithub size={24} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-md lg:text-md text-gray-400 font-semibold">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
