const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    rental: {
        type: Boolean,
        required: true,
    },
    company: {
        type: String,
        trim: true,
        required: false,
    },
    pickUpTime: {
        type: String,
        trim: true,
        required: false,
    },
    returnTime: {
        type: String,
        trim: true,
        required: false,
    },
    carModel: {
        type: String,
        trim: true,
        required: false,
    },
});

const Car = model('Car', carSchema);

module.exports = Car;
