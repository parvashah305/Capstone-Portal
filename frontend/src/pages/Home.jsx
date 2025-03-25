import React, { useEffect, useState } from "react";
import Tile from "../components/Tile";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const allowedDomains = [
  "AI",
  "Artificial Intelligence",
  "Augmented & Virtual Reality",
  "Blockchain Technology",
  "Cloud Computing",
  "Computer Networks",
  "Computer Vision",
  "Cyber Security",
  "Data Analytics",
  "Deep Learning",
  "Deep Neural Networks",
  "Data Mining",
  "Gen AI",
  "Explainable AI",
  "Agentic AI",
  "Healthcare Analytics",
  "IoT",
  "Knowledge Graph",
  "Machine Learning",
  "Natural Language Processing",
  "Robotic Process Automation",
  "Signal Processing",
  "System and Architecture / Parallel Computing / Compiler Optimization",
  "Web Intelligence",
];

const Home = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [facultyData, setFacultyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        setLoading(true);
        const domainData = {};

        for (const domain of allowedDomains) {
          const response = await fetch(
            `http://localhost:3000/faculty-domain?domain=${encodeURIComponent(domain)}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch data for domain: ${domain}`);
          }

          const data = await response.json();
          if (data.length > 0) {
            domainData[domain] = data;
          }
        }

        setFacultyData(domainData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <p className="text-red-500 font-bold">Error: {error}</p>
      </div>
    );
  }

  const domains = Object.entries(facultyData);
  const totalPages = Math.ceil(domains.length / itemsPerPage);
  const paginatedDomains = domains.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {paginatedDomains.map(([domain, facultyList]) => (
        <div key={domain} className="mb-10">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">{domain}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {facultyList.map((faculty) => (
              <Tile
                key={faculty._id}
                image={faculty.ImageURL}
                name={faculty.Name}
                role={faculty.Designation}
                email={faculty.Email}
                info={faculty.ProfileURL}
                slots={4}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex w-full justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-950 text-white text-2xl rounded-md p-2 disabled:opacity-50"
        >
          <FaCaretLeft />
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-950 text-white text-2xl rounded-md p-2 disabled:opacity-50"
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
