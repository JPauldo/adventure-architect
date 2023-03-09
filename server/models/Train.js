const { Schema, model } = require('mongoose');

const trainSchema = new Schema({
    company: {
        type: String,
        trim: true,
        required: true,
    },
    station: {
        type: String,
        trim: true,
        required: true,
    },
    carNumber: {
        type: String,
        trim: true,
        required: true,
    },
    boardingTime: {
        type: String,
        trim: true,
        required: true,
    },
    departureTime: {
        type: String,
        trim: true,
        required: true,
    },
});

const Train = model('Train', trainSchema);

module.exports = Train;
