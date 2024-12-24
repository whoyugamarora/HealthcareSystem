import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendarCheck, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ user }) => {
    const [filteredAppointments, setfilteredAppointments] = useState([]);
    const [nearestAppointment, setNearestAppointment] = useState(null);
    const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

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
                .filter((appointment) => new Date(appointment.date) > new Date()) // Only future appointments
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

            // Update state for filtered appointments and nearest appointment
            setfilteredAppointments(filteredData);
            setNearestAppointment(upcomingAppointments[0] || null);

            console.log("Nearest Appointment:", upcomingAppointments[0]);
        } catch (err) {
            console.error("Error fetching or sorting appointments:", err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="flex flex-col bg-gray-200">
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="flex flex-col lg:flex-row shadow-2xl bg-gray-100 py-10 px-5 lg:px-10" style={{ minHeight: "calc(100vh - 4rem)" }}>
                <div className="w-full lg:w-1/2 flex flex-col justify-start items-center gap-6 mb-4 lg:mb-0">
                    <img src={avatarUrl} alt="User Image" className="w-36 w-36 md:w-48 md:h-48 rounded-full border-4 border-indigo-700" />
                    <p className="text-xl font-bold text-gray-700 md:text-2xl"><span className="font-bold text-indigo-600">Display Name:</span> {user.displayName}</p>
                    <p className="text-xl font-bold text-gray-700 md:text-2xl"><span className="font-bold text-indigo-600">Email:</span> {user.email}</p>
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0 flex flex-col gap-4 justify-start">
                    <div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">Services</h1>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 break-words">
                                <a href="/appointments"><div className="bg-indigo-200 px-5 py-8 md:py-10 rounded-2xl shadow-md hover:bg-indigo-300 cursor-pointer font-semibold text-gray-700"><FontAwesomeIcon icon={faCalendarCheck} size="lg" /> Upcoming Appointments</div></a>
                                <a href="/history"><div className="bg-indigo-200 px-5 py-8 md:py-10 rounded-2xl shadow-md hover:bg-indigo-300 cursor-pointer font-semibold text-gray-700"><FontAwesomeIcon icon={faClockRotateLeft} size="lg" /> View History</div></a>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold">Notifications</h2>
                                {nearestAppointment ? (
                                    <div className="bg-yellow-100 p-4 rounded-md mt-4 shadow">
                                        <p className="text-yellow-700">
                                            <FontAwesomeIcon icon={faBell} size="lg" />{" "} Reminder: You have an appointment on{" "}
                                            {new Date(nearestAppointment.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}{" "}
                                            at {nearestAppointment.time}.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-100 p-4 rounded-md mt-4 shadow">
                                        <p className="text-yellow-700">
                                            <FontAwesomeIcon icon={faBell} size="lg" /> No upcoming appointments.
                                        </p>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;