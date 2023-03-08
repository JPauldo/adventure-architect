const { Schema, model } = require('mongoose');

const tripSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    location:  {
      type: String,
      required: true
    },
    transport: {
      type: Schema.Types.ObjectId,
      ref: 'Transportation',
      required: false
    },
    startingDate: {
      type: String,
      required: true
    },
    endingDate: {
      type: String,
      required: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: false
    },
    daysOfTrip: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Day',
        required: false
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Trip = model('Trip', tripSchema);

module.exports = Trip;
