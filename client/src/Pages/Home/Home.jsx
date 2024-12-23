import React from "react";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";

const Home = () => {
    return (
        <div className="w-full min-h-screen">
            <HomeNavbar />
            <header className="py-20 text-center bg-indigo-600 text-white">
                <div className="container mx-auto">
                    <h1 className="text-7xl font-extrabold mb-6">HealthCare</h1>
                    <p className="text-lg">Access HealthCare facilities easily in a few clicks!</p>
                </div>
                <div className="mt-10">
                    <a
                        href="/login"
                        className="py-4 px-4 bg-gray-100 text-indigo-600 font-semibold rounded-full shadow-md hover:bg-gray-300"
                    >
                        Get Started
                    </a>
                </div>
            </header>

            <main className="py-16">
                {/* Features Section */}
                <section className="container mx-auto px-6 pb-10">
                    <h2 className="text-5xl font-extrabold text-center mb-20 text-indigo-800">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        <div className="p-20 bg-gray-100 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">Find Nearby Facilities</h3>
                            <p>Locate hospitals, clinics, and specialists near you with ease.</p>
                        </div>
                        <div className="p-20 bg-gray-100 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">Book Appointments</h3>
                            <p>Schedule appointments with healthcare professionals in a few clicks.</p>
                        </div>
                        <div className="p-20 bg-gray-100 rounded-lg shadow-md text-center">
                            <h3 className="text-2xl font-bold mb-4">Real-Time Updates</h3>
                            <p>Get notified about your appointment status and updates instantly.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-5xl font-extrabold text-center mb-20 text-indigo-800">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-20">
                                <h3 className="text-3xl font-extrabold mb-4">1. Search</h3>
                                <p>Use our powerful search tool to find healthcare facilities and services.</p>
                            </div>
                            <div className="p-20">
                                <h3 className="text-3xl font-extrabold mb-4">2. Book</h3>
                                <p>Pick a facility and book an appointment directly through the platform.</p>
                            </div>
                            <div className="p-20">
                                <h3 className="text-3xl font-extrabold mb-4">3. Confirm</h3>
                                <p>Receive confirmation and reminders to stay on top of your schedule.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="container mx-auto px-6 py-10">
                    <h2 className="text-5xl font-extrabold text-center mb-20 text-indigo-800">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className="p-20 bg-gray-100 rounded-lg shadow-md">
                            <p className="italic mb-4">
                                "This platform made it so easy to find a doctor near me and book an appointment!"
                            </p>
                            <p className="font-bold text-indigo-600">- Jane Doe</p>
                        </div>
                        <div className="p-20 bg-gray-100 rounded-lg shadow-md">
                            <p className="italic mb-4">
                                "I love how intuitive and user-friendly the interface is. Highly recommend!"
                            </p>
                            <p className="font-bold text-indigo-600">- John Smith</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-indigo-600 text-white py-8 text-center">
                <p>&copy; 2024 HealthCare. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
