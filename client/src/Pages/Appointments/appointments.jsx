import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";

const Appointments = ({ user }) => {
    const [locations, setLocations] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setfilteredAppointments] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");

    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/locations");
            setLocations(response.data);
        } catch (err) {
            console.error("Error fetching locations:", err.message);
        }
    };

    // Fetch user appointments
    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/appointments`);

            // Filter the appointments directly from the fetched data
            const filteredData = response.data.filter(
                (appointment) => appointment.userId === user.uid
            );

            const upcomingAppointments = filteredData.filter((appointment) => new Date(appointment.date) > new Date());


            // Update states after filtering
            setfilteredAppointments(upcomingAppointments);
            setAppointments(response.data);

        } catch (err) {
            console.error("Error fetching appointments:", err.message);
        }
    };

    useEffect(() => {
        fetchLocations();
        fetchAppointments();
    }, []);


    const handleBookAppointment = async (e) => {
        e.preventDefault();

        if (!selectedLocation || !date || !time) {
            setError("All fields are required.");
            return;
        }

        setError("");

        try {
            await axios.post("http://localhost:5000/appointments", {
                userId: user.uid,
                locationId: selectedLocation,
                date,
                time,
            });

            console.log("Payload:", {
                userId: user.uid,
                locationId: selectedLocation,
                date,
                time,
            });

            alert("Appointment booked successfully!");
            setSelectedLocation("");
            setDate("");
            setTime("");
        } catch (err) {
            console.error("Error booking appointment:", err.message);
            setError("Failed to book appointment. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="flex flex-col md:flex-row p-10">
                <div className="w-full md:w-1/2 ml-0 md:mr-2">
                    <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Book an Appointment</h1>
                    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleBookAppointment} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Location
                                </label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full mt-2 p-2 border rounded-md"
                                >
                                    <option value="">Choose a location</option>
                                    {locations.map((location) => (
                                        <option key={location.name} value={location.name}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full mt-2 p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full mt-2 p-2 border rounded-md"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                            >
                                Book Appointment
                            </button>
                        </form>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-6 ml-0 md:ml-2 md:mt-0">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">Your Upcoming Appointments</h2>
                    {filteredAppointments.length > 0 ? (
                        <ul className="space-y-4 lg:space-y-0 grid grid-cols-1 lg:grid-cols-2 gap-5 rounded-lg">
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

export default Appointments;
