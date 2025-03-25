import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (!isVisible) return null;
    return (
        <button onClick={scrollToTop} className="fixed text-xl bottom-5 right-5 bg-blue-950 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition">
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;