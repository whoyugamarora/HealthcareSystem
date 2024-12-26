const express = require('express');
const router = express.Router();
const BMI = require('../models/bmi');

// Fetch all appointments
router.get("/", async (req, res) => {
    const { userId } = req.query; // Expect `userId` as a query parameter

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const bmi = await BMI.find({userId}).sort({createdAt: -1}).limit(6); // Use async/await to query the database
        res.json(bmi);
    } catch (err) {
        console.error("Error fetching bmis:", err.message); // Log the error for debugging
        res.status(500).send(err); // Send a 500 status with the error message
    }
});


// Add a new appointment
router.post("/", async (req, res) => {
    const { userId, weight, height, bmi, category } = req.body;

    if (!userId || !bmi || !category || !weight || !height) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Create a new appointment
        const newbmi = new BMI({
            userId,
            weight,
            height,
            bmi,
            category,
        });

        await newbmi.save();
        res.status(201).json({ message: "BMI saved successfully.", bmi });
    } catch (err) {
        console.error("Error saving BMI:", err.message);
        res.status(500).json({ error: "Failed to save BMI." });
    }
});

module.exports = router;