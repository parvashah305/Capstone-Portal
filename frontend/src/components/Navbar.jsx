import React from "react";
import SearchBar from "./SearchBar";
import Menu from "./Menu"
const campus = [
    {
        name: "Staff",
        branch: [
            { name: "A to Z", route: "/staff/a-to-z" },
            { name: "Domain", route: "/" },
        ],
    },
    {
        name: "EC Campus",
        branch: [
            { name: "Computer Science", route: "/ec-campus/computer-science" },
            { name: "Electronics and Communications", route: "/ec-campus/electronics-communications" },
        ],
    },
    {
        name: "RR Campus",
        branch: [
            { name: "Computer Science", route: "/rr-campus/computer-science" },
            { name: "Electronics and Communications", route: "/rr-campus/electronics-communications" },
            { name: "Electrical", route: "/rr-campus/electrical" },
            { name: "Mechanical", route: "/rr-campus/mechanical" },
        ],
    }
]

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 w-screen fixed top-0 left-0 right-0">
            <div className="flex justify-between items-center w-full px-6">
                <div className="flex items-center">
                    <img 
                        src="https://staff.pes.edu/static/images/pes-favicon/PESU-new-logo.png" 
                        alt="PES"
                        className="h-16"
                    />
                    <div className="ml-20">
                        <SearchBar />
                    </div>
                </div>
                <div className="flex gap-20 mr-10 items-center">
                    {campus.map((campusItem, index) => (
                        <Menu key={index} name={campusItem.name} branches={campusItem.branch} />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
