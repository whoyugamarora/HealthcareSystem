import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";

const History = ({ user }) => {
    const[filteredAppointments, setfilteredAppointments] = useState([]);
    const [nearestAppointment, setNearestAppointment] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/appointments`);

            // Filter appointments for the current user
            const filteredData = response.data.filter(
                (appointment) => appointment.userId === user.uid
            );

            console.log(filteredData); // Log the filtered data

            // Sort and find the nearest appointment
            const upcomingAppointments = filteredData
                .filter((appointment) => new Date(appointment.date) < new Date()) // Only future appointments

            // Update state for filtered appointments and nearest appointment
            setfilteredAppointments(upcomingAppointments);

        } catch (err) {
            console.error("Error fetching or sorting appointments:", err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div>
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="py-10">
                <h1 className="text-xl md:text-3xl font-bold mb-10">Your Appointment History</h1>
                <div className="w-full mt-6 md:mt-0">
                    {filteredAppointments.length > 0 ? (
                        <ul className="space-y-2 md:space-y-0 w-4/5 md:w-3/4 lg:w-1/2 mx-auto grid grid-cols-1 md:grid-cols-2 justify-center gap-5 rounded-lg ">
                            {filteredAppointments.map((appointment, index) => (
                                <li
                                    key={index}
                                    className="bg-indigo-200 flex flex-col gap-2 py-10 px-5 text-left rounded-lg shadow-md"
                                >
                                    <p className="font-semibold text-gray-800 text-sm">
                                        <span className="font-bold text-indigo-800 text-md">Location:</span> {appointment.locationId}
                                    </p>
                                    <p className="font-semibold text-gray-800 text-sm">
                                        <span className="font-bold text-indigo-800 text-md">Date:</span> {new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className="font-semibold text-gray-800 text-sm">
                                        <span className="font-bold text-indigo-800 text-md">Time:</span> {appointment.time}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;