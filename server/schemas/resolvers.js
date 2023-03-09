const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Hotel, Transportation, Train, Car, Flight, Day, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged-in user info
        getMe: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate('trips');
                return user;
            } else if (args.firstName && args.lastName) {
                const user = await User.findOne({
                    firstName: args.firstName,
                    lastName: args.lastName
                }).populate('trips');
                return user;
            } else {
                throw new AuthenticationError('You need to be logged in!');
            }
        },

        getSingleUser: async (parent, { firstName, lastName }) => {
            const user = await User.findOne({ firstName, lastName });
            return user;
        },

        // Get all users in DB
        getAllUsers: async (parent, args) => {
            return await User.find({});
        }
    },

    Mutation: {
        // Login as existing user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        // Sign up as new user
        addUser: async (parent, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            const user = await User.findOneAndUpdate(
                context.user._id,
                { args },
                { runValidators: true, new: true }
            );
            
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;