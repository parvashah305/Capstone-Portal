import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const domains = [
  "Artificial Intelligence & Machine Learning (AI/ML)",
  "Augmented & Virtual Reality (AR/VR)",
  "Blockchain Technology",
  "Cloud Computing",
  "Computer Networks",
  "Computer Vision",
  "Cybersecurity & IoT Security",
  "Data Analytics & Data Mining",
  "IoT & Wireless Sensor Networks",
  "Knowledge Graphs & Ontologies",
  "Natural Language Processing (NLP)",
  "Robotic Process Automation (RPA)",
  "Signal Processing",
  "System Architecture & Parallel Computing",
  "Web Intelligence",
];

const TeamDetailsPage = () => {
  const { state } = useLocation();
  const mentorEmail = state?.mentorEmail || "No mentor email provided";

  const { handleSubmit, register, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false); 

  const onSubmit = (data) => {
    const requestBody = {
      teamMembers: [
        {
          name: data.member1_name,
          srn: data.member1_srn,
          section: data.member1_section,
          cgpa: data.member1_cgpa,
        },
        {
          name: data.member2_name,
          srn: data.member2_srn,
          section: data.member2_section,
          cgpa: data.member2_cgpa,
        },
        {
          name: data.member3_name,
          srn: data.member3_srn,
          section: data.member3_section,
          cgpa: data.member3_cgpa,
        },
        {
          name: data.member4_name,
          srn: data.member4_srn,
          section: data.member4_section,
          cgpa: data.member4_cgpa,
        },
      ],
      domainsOfInterest: data.domains,
      mentorEmail: mentorEmail,
    };

    console.log("Form Data Submitted: ", requestBody);

    setIsLoading(true);

    fetch("http://localhost:3000/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Email sent successfully:", result);
        toast.success("Email sent successfully!", { position: "top-right" });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send email. Please try again.", {
          position: "top-right",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <ToastContainer /> 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-blue-950 mb-6">TEAM DETAILS</h2>
        <p className="mb-4 text-gray-700">
          Sending request to mentor: <strong>{mentorEmail}</strong>
        </p>

        {[1, 2, 3, 4].map((member) => (
          <div key={member} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Team Member {member} {member < 4 ? "*" : ""}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name{member < 4 ? "*" : ""} :
                </label>
                <input
                  {...register(`member${member}_name`, { required: member < 4 })}
                  className="border rounded-md w-full p-2"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  SRN{member < 4 ? "*" : ""} :
                </label>
                <input
                  {...register(`member${member}_srn`, { required: member < 4 })}
                  className="border rounded-md w-full p-2"
                  placeholder="Enter SRN"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Section{member < 4 ? "*" : ""} :
                </label>
                <input
                  {...register(`member${member}_section`, {
                    required: member < 4,
                  })}
                  className="border rounded-md w-full p-2"
                  placeholder="Enter section"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  CGPA{member < 4 ? "*" : ""} :
                </label>
                <input
                  {...register(`member${member}_cgpa`, { required: member < 4 })}
                  className="border rounded-md w-full p-2"
                  placeholder="Enter CGPA"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Domains of Interest (Choose 3):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <select
                key={index}
                {...register(`domains.${index - 1}`, { required: true })}
                className="border rounded-md w-full p-2"
              >
                <option value="">Select Domain</option>
                {domains.map((domain, idx) => (
                  <option key={idx} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-blue-950 text-white px-6 py-2 rounded-md"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-950 text-white px-6 py-2 rounded-md flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Send Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamDetailsPage;
