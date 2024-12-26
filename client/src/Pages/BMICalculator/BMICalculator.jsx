import React, { useState, useEffect } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BMICalculator = ({ user }) => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState("");
    const [userBmi, setUserBmi] = useState([]);

    const fetchBmis = async () => {

        try {
            const response = await axios.get(`http://localhost:5000/bmi`, {
                params: { userId: user.uid }, // Pass `userId` as a query parameter
            });

            setUserBmi(response.data);
            console.log(response.data);

        } catch (err) {
            console.error("Error fetching bmis", err.message);
        }
    };

    useEffect(() => {
        fetchBmis();
    }, [user.uid]);

    const CalculateBMI = async (e) => {
        e.preventDefault();

        if (!weight || !height || weight <= 0 || height <= 0) {
            alert("Please enter valid weight and height!");
            return;
        }

        // BMI formula: weight (kg) / [height (m)]^2
        const heightInMeters = height / 100; // Convert height to meters
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);
        let categoryValue = "";

        if (bmiValue < 18.5 && bmiValue > 0) {
            categoryValue = "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            categoryValue = "Normal";
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            categoryValue = "Overweight";
        } else if (bmiValue >= 30) {
            categoryValue = "Obesity";
        } else {
            categoryValue = "No Result";
        }
        setCategory(categoryValue);

        try {
            await axios.post(`http://localhost:5000/bmi`, {
                userId: user.uid,
                weight: weight,
                height: height,
                bmi: bmiValue,
                category: categoryValue,
            });

        } catch (err) {
            console.error('Error uploading the BMI', err.message);
            alert("Failed to save BMI. Please try again.");
        }

         // Fetch updated BMI history after successfully adding the new BMI
         fetchBmis();

         // Clear input fields after calculation
         setWeight("");
         setHeight("");

    };

    return (
        <div>
            {user ? <Navbar /> : <HomeNavbar />}
            <div className="flex flex-col lg:flex-row justify-center">
                <div className="w-full lg:w-1/2 p-4 mt-0 lg:py-8 mx-auto">
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
                                <h2 className="text-2xl font-bold">Your BMI: <span className={`${bmi >= 25 ? "text-red-600" : "text-green-700"}`}>{bmi}</span></h2>
                                <h3 className="text-2xl font-bold mt-2">Category: <span className={`${category === "Overweight" || category === "Obesity" ? "text-red-600" : "text-green-700"}`}>{category}</span></h3>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-4 mt-0 lg:py-8 mx-auto">
                    <h1 className="mb-6 text-3xl font-extrabold text-indigo-700">BMI History</h1>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {userBmi.length > 0 ? (
                            userBmi.map((fetchedbmi) =>
                                <li className="p-6 flex flex-col gap-1 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl text-left border border-indigo-300 bg-gradient-to-r from-indigo-100 to-indigo-200">
                                    <p className="text-center font-bold text-indigo-800">{new Date(fetchedbmi.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="font-bold">Weight: <span className="font-normal">{fetchedbmi.weight}</span></p>
                                    <p className="font-bold">Height: <span className="font-normal">{fetchedbmi.height}</span></p>
                                    <p className="font-bold">BMI: <span className="font-normal">{fetchedbmi.bmi}</span></p>
                                    <p className="font-bold">Category - <span className="font-normal">{fetchedbmi.category}</span></p>
                                </li>

                            )) :
                            (<li className="col-span-1 md:col-span-2 lg:w-1/2 p-4 flex justify-center">
                                <p>No BMI History</p>
                            </li>)
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default BMICalculator;