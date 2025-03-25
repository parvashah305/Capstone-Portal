import React, { useState, useEffect } from "react";

const ScrollProgress = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;

            setScrollPercentage(progress);
            setIsVisible(progress > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-1/2 right-5 bg-white shadow-lg rounded-lg p-4 w-20 h-20 flex items-center justify-center border border-gray-300">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="6" fill="none" />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#1E40AF"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="282.74"
                    strokeDashoffset={282.74 - (scrollPercentage / 100) * 282.74}
                    strokeLinecap="round"
                    transition="stroke-dashoffset 0.2s ease-out"
                />
                <circle cx="50" cy="50" r="4" fill="#1E40AF" />
            </svg>
        </div>
    );
};

export default ScrollProgress;