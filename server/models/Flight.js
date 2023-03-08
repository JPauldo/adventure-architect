const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
airline: {
    type: String,
    trim: true,
    required: true,
},
airport: {
    type: String,
    trim: true,
    required: true,
},
gate: {
    type: String,
    trim: true,
    required: true,
},
flightTime: {
    type: String,
    trim: true,
    required: true,
},
boardingTime: {
    type: String,
    trim: true,
    required: true,
},
parkingSpot: {
    type: String,
    trim: true,
    required: false,
},
});

const Flight = model('Flight', flightSchema);

module.exports = Flight;
