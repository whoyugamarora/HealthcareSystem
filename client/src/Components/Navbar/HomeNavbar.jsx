import React, { useState } from "react";

const HomeNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-indigo-600 p-4 ">
            <div className="container mx-auto flex justify-between items-center w-full">
                <div className="text-white">
                    <h1 className="text-2xl font-bold hover:text-gray-300"><a href="/">HealthCare</a></h1>
                </div>
                <ul className="hidden md:flex text-gray-100 flex space-x-10 font-medium">
                    <li className="hover:text-gray-300"><a href="/">Home</a></li>
                    <li className="hover:text-gray-300"><a href="/map">Map</a></li>
                    <li className="hover:text-gray-300"><a href="/features">Features</a></li>
                    <li className="hover:text-gray-300"><a href="/demo">Demo</a></li>
                </ul>
                <div className="hidden md:flex text-gray-100 flex space-x-6 font-medium">
                    <p className="hover:text-gray-300"><a href="/login">Login</a></p>
                    <p className="hover:text-gray-300"><a href="/signup">Sign Up</a></p>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden text-gray-100"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-indigo-600 p-4 mt-5">
                    <ul className="text-gray-100 space-y-10 font-medium">
                        <li className="hover:text-gray-300"><a href="/">Home</a></li>
                        <li className="hover:text-gray-300"><a href="/map">Map</a></li>
                        <li className="hover:text-gray-300"><a href="/features">Features</a></li>
                        <li className="hover:text-gray-300"><a href="/demo">Demo</a></li>
                    </ul>
                    <div className="mt-10 text-gray-100 space-y-10 font-medium">
                        <p className="hover:text-gray-300"><a href="/login">Login</a></p>
                        <p className="hover:text-gray-300"><a href="/signup">Sign Up</a></p>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default HomeNavbar;