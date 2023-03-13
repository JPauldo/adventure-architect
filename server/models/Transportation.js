const { Schema, model } = require('mongoose');

const transportationSchema = new Schema(
  {
    flightId: {
      type: Schema.Types.ObjectId,
      ref: 'Flight',
      required: false
    },
    trainId: {
      type: Schema.Types.ObjectId,
      ref: 'Train',
      required: false
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: false
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Transportation = model('Transportation', transportationSchema);

module.exports = Transportation;