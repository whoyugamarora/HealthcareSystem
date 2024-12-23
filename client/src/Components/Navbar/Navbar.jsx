import React from "react";
import { auth } from "../../Components/Authentication/firebase";

const Navbar = () => {

    return (
        <nav className="bg-indigo-600 p-4 ">
            <div className="container mx-auto flex justify-between items-center w-full">
                <div className="text-white">
                    <h1 className="text-2xl font-bold hover:text-gray-300">HealthCare</h1>
                </div>
                <ul className="text-gray-100 flex space-x-8 font-medium">
                    <li className="hover:text-gray-300"><a href="/dashboard">Dashboard</a></li>
                    <li className="hover:text-gray-300"><a href="/map">Map</a></li>
                    <li className="hover:text-gray-300"><a href="/history">History</a></li>
                    <li className="hover:text-gray-300"><a href="/appointments">Appointments</a></li>
                </ul>
                <div className="text-gray-100 flex space-x-6 font-medium">
                    <p className="hover:text-gray-300"><a href="/account">Account</a></p>
                    <p className="hover:text-gray-300"><a href="/" onClick={() => auth.signOut()}>Sign Out</a></p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;