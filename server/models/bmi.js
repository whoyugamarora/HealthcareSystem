const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        weight: {type: Number, required: true},
        height: {type: Number, required: true},
        bmi: {type: Number, required: true},
        category: {type: String, required: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("BMI", bmiSchema);