import React, { useEffect, useState } from "react";
import Tile from "../components/Tile";

const Staff = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchFacultyData = async () => {
      try {
        const response = await fetch("http://localhost:3000/sorted-faculty"); 
        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }
        const data = await response.json();
        setFacultyData(data); 
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

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="font-bold text-blue-950 text-3xl mt-28 mb-4">Staff: A to Z</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {facultyData.map((faculty) => (
          <Tile
            key={faculty._id}
            image={faculty.ImageURL}
            name={faculty.Name}
            role={faculty.Designation}
            email={faculty.Email}
            info={faculty.ProfileURL}
            domains={[
              faculty.Domain1,
              faculty.Domain2,
              faculty.Domain3,
            ].filter(Boolean)}
            slots={4}
          />
        ))}
      </div>
    </div>
  );
};

export default Staff;
