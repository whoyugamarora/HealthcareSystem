import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import { hospital, childcare, dentist, family, defaultpin } from "../../Components/map/icons";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faMap } from "@fortawesome/free-regular-svg-icons";
import { faMapLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Map = ({ user }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [locations, setLocations] = useState([]); // All locations fetched from the backend
    const [filteredLocations, setFilteredLocations] = useState([]); // Locations filtered by search query
    const defaultcoordinates = [49.049999, -122.316666];

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]); // Set user's location
                },
                (error) => {
                    console.error("Error fetching user location:", error);
                    setUserLocation([51.505, -0.09]); // Default location if permission is denied
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setUserLocation([51.505, -0.09]); // Default location
        }
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/locations');
            setLocations(response.data);
            console.log('Locations:', locations);
        } catch (err) {
            console.error('Error fetching locations:', err);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page

        // Filter locations based on search query
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            setFilteredLocations([]); // Clear filtered results if the search query is empty
            return;
        }

        const filtered = locations.filter((location) =>
            location.name.toLowerCase().includes(query) ||
            location.type.toLowerCase().includes(query) ||
            (location.description && location.description.toLowerCase().includes(query)) ||
            (location.city && location.city.toLowerCase().includes(query))
        );

        setFilteredLocations(filtered);
    };

    const PanToLocation = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            if (center) {
                map.setView(center, 13); // Pan to the searched location
            }
        }, [center, map]);
        return null;
    };

    const handleGetDirections = (locationName) => {
        // Generate a Google Maps URL with the location name
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationName)}`;
        console.log(googleMapsUrl);
        window.open(googleMapsUrl, "_blank"); // Open the URL in a new tab
    };


    return (
        <div className="min-h-screen flex flex-col">
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="bg-indigo-600 flex items-center flex-col justify-center flex-grow text-white font-medium px-8 md:flex-row md:justify-evenly">
                <div className="p-4 mt-4 flex-grow w-full md:w-1/2 md:mt-0">
                    <h1 className="text-2xl my-5 font-extrabold sm:text-4xl">Search for Locations:</h1>
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onChangeCapture={handleSearch}
                        placeholder="Search Locations"
                        className="py-3 px-8 rounded-lg text-gray-700 font-bold" />
                    <button onClick={handleSearch} className="bg-gray-100 text-indigo-600 px-4 py-3 rounded-lg mt-4 ml-2 hover:bg-gray-300">
                        Search
                    </button>
                </div>
                <div className="flex-grow flex flex-col py-4 w-full md:w-1/2">
                    {filteredLocations.length > 0 ? (
                        <ul className="grid grid-flow-col grid-rows-1 gap-4 overflow-x-auto hide-scrollbar" >
                            {filteredLocations.map((location, index) => (
                                <li
                                    key={index}
                                    className="p-6 border mx-auto rounded-xl shadow-md bg-gray-100 text-black w-96 content-center cursor-pointer"
                                >
                                    <strong className="block text-xl font-bold text-indigo-800 break-keep">{location.name}</strong>
                                    <span className="block text-indigo-800">{location.type}, {location.city}</span>
                                    <br />
                                    <p className="text-sm text-gray-800 font-semibold break-keep">
                                        {location.description || "No additional details available."}
                                    </p><br />
                                    <div className="flex gap-2">
                                        <button
                                            className={`w-1/2 py-2 text-white rounded-md ${location.phone ? "bg-indigo-500 hover:bg-indigo-700" : "bg-indigo-500"
                                                }`}
                                            onClick={() => location.phone && window.open(`tel:${location.phone}`, "_self")}
                                            disabled={!location.phone}
                                        >
                                            {location.phone ? <FontAwesomeIcon icon={faPhone} /> : "No Phone Available"}
                                        </button>
                                        <button
                                            onClick={() => handleGetDirections(location.name)}
                                            className="w-1/2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            <FontAwesomeIcon icon={faMapLocationDot} />
                                        </button>
                                    </div>
                                    <a href="/appointments"><button className="mt-2 w-full py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-700"><FontAwesomeIcon icon={faCalendarCheck} /> Book Online</button></a>
                                </li>
                            ))}
                        </ul>
                    ) : searchQuery.trim() !== "" ? (
                        <p className="text-red-500 text-sm mt-2">No results found</p>
                    ) : null}
                </div>
            </div>
            <div className="w-full" style={{ height: "55vh" }}>
                <MapContainer
                    center={defaultcoordinates}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={defaultcoordinates} icon={defaultpin}>
                        <Popup>You are Here!</Popup>
                    </Marker>
                    <PanToLocation center={filteredLocations.length > 0 ? [filteredLocations[0].latitude, filteredLocations[0].longitude] : defaultcoordinates} />
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.latitude, location.longitude]}
                            icon={
                                location.type === "Hospital"
                                    ? hospital
                                    : location.type === "Dentist"
                                        ? dentist
                                        : location.type === "Childcare"
                                            ? childcare
                                            : location.type === "Doctor" ? family : defaultpin
                            }
                        >
                            <Popup>
                                <div>
                                    <h1 className="text-xl text-center font-bold text-indigo-800">{location.name}</h1>
                                    <p className="text-center text-md font-semibold">{location.type}, {location.city}</p>
                                    <p className="text-gray-800 text-xs text-center font-medium">{location.description || 'No additional information.'}</p>
                                    <div className="flex gap-2">
                                        <button
                                            className={`w-1/2 py-2 text-white rounded-md ${location.phone ? "bg-indigo-500 hover:bg-indigo-700" : "bg-indigo-500"
                                                }`}
                                            onClick={() => location.phone && window.open(`tel:${location.phone}`, "_self")}
                                            disabled={!location.phone}
                                        >
                                            {location.phone ? <FontAwesomeIcon icon={faPhone} /> : "No Phone Available"}
                                        </button>
                                        <button
                                            onClick={() => handleGetDirections(location.name)}
                                            className="w-1/2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            <FontAwesomeIcon icon={faMapLocationDot} />
                                        </button>
                                    </div>
                                    <a href="/appointments"><button className="mt-2 w-full py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-700"><FontAwesomeIcon icon={faCalendarCheck} /> Book Online</button></a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    <PanToLocation />
                </MapContainer>
            </div>
        </div>

    );
};

export default Map;
