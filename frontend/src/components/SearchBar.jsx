import React, { useState } from "react";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");

    return (
        <form className="relative flex items-center w-[200px]">
            <label className="relative flex items-center w-full px-4 py-2 bg-white rounded-full shadow-md">
                <div className="absolute left-4 text-[#949faa]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </div>
                <input
                    type="text"
                    className="w-full bg-transparent pl-8 pr-10 text-black placeholder-[#949faa] outline-none"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                />
                {inputValue && (
                    <button
                        type="reset"
                        onClick={() => setInputValue("")}
                        className="absolute right-4 w-5 h-5 flex items-center justify-center bg-[#1b9bee] text-white rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                )}
            </label>
        </form>
    );
};

export default SearchBar;