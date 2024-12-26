const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, enum: ["Hospital", "Dentist", "Doctor", "Childcare"], required: true },
    description: {type: String},
    city: {type: String, required: true},
    phone: { type: Number},
});

LocationSchema.index({ name: 1, city: 1 }, { unique: true });

module.exports = mongoose.model('Location', LocationSchema);
