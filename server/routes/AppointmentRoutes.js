const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const Location = require("../models/locationmodel");

// Fetch all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find(); // Use async/await to query the database
        res.json(appointments);
    } catch (err) {
        console.error("Error fetching appointments:", err.message); // Log the error for debugging
        res.status(500).send(err); // Send a 500 status with the error message
    }
});


// Add a new appointment
router.post("/", async (req, res) => {
    const { userId, locationId, date, time } = req.body;

    if (!userId || !locationId || !date || !time) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Create a new appointment
        const appointment = new Appointment({
            userId,
            locationId,
            date,
            time,
        });

        await appointment.save();
        res.status(201).json({ message: "Appointment created successfully.", appointment });
    } catch (err) {
        console.error("Error creating appointment:", err.message);
        res.status(500).json({ error: "Failed to create appointment." });
    }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.json({ message: "Appointment deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete appointment." });
    }
});

module.exports = router;
