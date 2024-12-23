const express = require('express');
const router = express.Router();
const Location = require('../models/locationmodel'); // Import the Location model

// Route to fetch all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find(); // Retrieve all locations from MongoDB
        res.status(200).json(locations);
    } catch (err) {
        console.error('Error fetching locations:', err);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

// Route to fetch all locations by search
router.get('/search', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const locations = await Location.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive match on name
                { type: { $regex: query, $options: 'i' } }, // Case-insensitive match on type
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive match on description
                { city: {$regex: query, $options: 'i' } },
            ],
        });

        res.status(200).json(locations);
    } catch (err) {
        console.error('Error performing regex search:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to add a new location
router.post('/', async (req, res) => {
    try {
        const { name, latitude, longitude, type, description, city, phone } = req.body;

        // Validation (optional, can expand as needed)
        if (!name || !latitude || !longitude || !type) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create and save new location
        const newLocation = new Location({
            name,
            latitude,
            longitude,
            type,
            description,
            city,
            phone,
        });

        await newLocation.save();
        res.status(201).json({ message: 'Location added successfully!', location: newLocation });
    } catch (err) {
        console.error('Error adding location:', err);
        res.status(500).json({ error: 'Server error while adding location.' });
    }
});

// Delete location by ID
router.delete('/id/:id', async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully', deletedLocation });
    } catch (err) {
        console.error('Error deleting location by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete location by Name
router.delete('/name/:name', async (req, res) => {
    try {
        const deletedLocation = await Location.findOneAndDelete({ name: req.params.name });
        if (!deletedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully', deletedLocation });
    } catch (err) {
        console.error('Error deleting location by Name:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete location by Latitude and Longitude
router.delete('/coords', async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }

    try {
        const deletedLocation = await Location.findOneAndDelete({
            latitude,
            longitude,
        });
        if (!deletedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully', deletedLocation });
    } catch (err) {
        console.error('Error deleting location by Coordinates:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
