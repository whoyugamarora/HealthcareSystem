import React, { useState, useEffect } from "react";
import {
    signInWithGoogle,
    registerWithEmailAndPassword,
} from "../../Components/Authentication/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Components/Authentication/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            await registerWithEmailAndPassword(name, email, password);
            navigate("/dashboard"); // Navigate to the dashboard
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <HomeNavbar />
            <div
                className="flex items-center justify-center bg-gray-100 px-4 md:px-0"
                style={{ height: "calc(100vh - 4rem)" }}
            >
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">
                        Welcome
                    </h2>
                    <p className="mt-2 text-center text-gray-600">Sign Up to HealthCare</p>
                    <form onSubmit={handleSignup} className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="registerName"
                                className="block text-sm font-medium text-gray-600 text-left"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="registerName"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600 text-left"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600 text-left"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                            />
                        </div>
                        <p className="my-4 text-sm">
                            Have an account?{" "}
                            <a href="/login" className="text-indigo-600">
                                Log In
                            </a>
                        </p>
                        {error && (
                            <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mb-3 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faGoogle} size="md" />
                            <span className="mx-2">Sign Up with Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
