import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitMedical, faMap, faUser } from "@fortawesome/free-solid-svg-icons";


const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="w-full flex flex-col flex-grow">
                <header className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white h-[250px] md:h-[400px] flex flex-col-reverse md:flex-row items-center justify-around">
                    <h1 className="text-2xl md:text-3xl font-bold pb-3 md:pb-3">Welcome back, {user?.displayName || "User"}!</h1>
                    <img src={avatarUrl} className="w-44 h-44 md:w-48 md:h-48 rounded-full shadow-lg border-4 border-indigo-800"/>
                </header>
                <main className="p-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                            className="py-10 md:py-20 bg-white rounded shadow-md hover:bg-indigo-100 cursor-pointer"
                            onClick={() => navigate("/map")}
                        >
                            <FontAwesomeIcon icon={faMap} size="2xl" className="mb-3"/>
                            <h2 className="text-lg font-semibold">View Map</h2>
                            <p>Locate healthcare facilities nearby.</p>
                        </div>
                        <div
                            className="p-10 md:py-20 bg-white rounded shadow-md hover:bg-indigo-100 cursor-pointer"
                            onClick={() => navigate("/profile")}
                        >
                            <FontAwesomeIcon icon={faUser} size="2xl" className="mb-3"/>
                            <h2 className="text-lg font-semibold">Profile Settings</h2>
                            <p>Update your personal information.</p>
                        </div>
                        <div
                            className="p-10 md:py-20 bg-white rounded shadow-md hover:bg-indigo-100 cursor-pointer"
                            onClick={() => alert("Emergency services feature coming soon!")}
                        >
                            <FontAwesomeIcon icon={faKitMedical} size="2xl" className="mb-3"/>
                            <h2 className="text-lg font-semibold">Emergency Services</h2>
                            <p>Quick access to emergency resources.</p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Dashboard;