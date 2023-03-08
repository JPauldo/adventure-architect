const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    bucket: [
      {
        name: {
          type: String,
          trim: true,
          required: false
        },
        location: {
          type: String,
          trim: true,
          required: false
        }
      }
    ],
    trips: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: false
    }
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
