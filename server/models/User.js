const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const firstName = v.split(' ')[0];
    const lastName = v.split(' ')[1];
    this.set({ first: firstName, last: lastName });
  });

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
