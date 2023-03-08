const { Schema, model } = require('mongoose');

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address:  {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    checkIn: {
      type: String,
      required: true
    },
    checkOut: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;