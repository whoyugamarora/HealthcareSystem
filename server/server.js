const cors = require('cors'); //Cross-Origin Request Sharing express middleware
const express = require('express'); // ExpressJS routing dependency
const mongoose = require('mongoose');
require('dotenv').config();
const LocationRoutes = require('./routes/LocationRoutes')

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.REACT_APP_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Route for the base URL
app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

// API routes for photos
app.use('/locations', LocationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
