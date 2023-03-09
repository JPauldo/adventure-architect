const { Schema, model } = require('mongoose');

const transportationSchema = new Schema(
  {
    flight: {
      type: Schema.Types.ObjectId,
      ref: 'Flight',
      required: false
    },
    train: {
      type: Schema.Types.ObjectId,
      ref: 'Train',
      required: false
    },
    car: {
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