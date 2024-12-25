import React, { useState, useEffect } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

const BMICalculator = ({ user }) => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState("");


    const CalculateBMI = (e) => {
        e.preventDefault();

        if (!weight || !height || weight <= 0 || height <= 0) {
            alert("Please enter valid weight and height!");
        }

        // BMI formula: weight (kg) / [height (m)]^2
        const heightInMeters = height / 100; // Convert height to meters
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);

        // Determine BMI category
        if (bmiValue < 18.5 && bmiValue > 0 ) {
            setCategory("Underweight");
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            setCategory("Normal weight");
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            setCategory("Overweight");
        } else if (bmiValue >= 30 ) {
            setCategory("Obesity");
        } else {
            setCategory("No Result");
        }

    };

    return (
        <div>
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-1/2 p-4 mt-0 lg:py-8 mx-auto" style={{minHeight: "calc(100vh - 4rem)"}}>
                    <h1 className="mb-6 text-3xl font-extrabold text-indigo-700">BMI Calculator</h1>
                    <form className="max-w-md mx-auto p-4" onSubmit={CalculateBMI}>
                        <div className="flex flex-col mb-2">
                            <label className="text-left m-2">Weight: (in Kgs)</label>
                            <input type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg p-2" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-left m-2">Height: (in cm)</label>
                            <input type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg p-2" />
                        </div>
                        <button type="submit"
                            className="mt-3 rounded p-4 shadow-md rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"><FontAwesomeIcon icon={faCalculator} /> Calculate</button>
                    </form>
                    <div className="mt-2 p-4 flex justify-center">
                        {bmi && (
                            <div>
                                <h2 className="text-2xl font-bold">Your BMI: <span className={`${bmi >= 25 ? "text-red-600" : "text-green-700"}` }>{bmi}</span></h2>
                                <h3 className="text-2xl font-bold mt-2">Category: <span className={`${category === "Overweight" || category === "Obesity" ? "text-red-600" : "text-green-700"}` }>{category}</span></h3>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/2"></div>
            </div>

        </div>
    );
};

export default BMICalculator;