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
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    context.user._id,
                    { args },
                    { runValidators: true, new: true }
                );
    
                const token = signToken(user);
                return { token, user };
            } else {
                const user = await User.findOneAndUpdate(
                    { email: args.email },
                    { args },
                    { runValidators: true, new: true }
                );
    
                const token = signToken(user);
                return { token, user };
            }
        },
        addToBucketList: async (parent, { bucketPlace, userId }, context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    context.user._id,
                    { $addToSet: { bucket: bucketPlace } },
                    { runValidators: true }
                );
            } else {
                await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { bucket: bucketPlace } },
                    { runValidators: true }
                );
            }
        },
        updateBucketList: async (parent, { bucketPlace, userId }, context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    context.user._id,
                    { $addToSet: { bucket: bucketPlace } },
                    { runValidators: true }
                )
            } else {
                
                await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { bucket: bucketPlace } },
                    { runValidators: true }
                );
            }
        },
        removeFromBucketList: async (parent, { _id }, context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    context.user._id,
                    { $pull: { bucket: bucketPlace } },
                    { runValidators: true }
                )
            } else {
                await User.findOneAndUpdate(
                    _id,
                    { $pull: { bucket: bucketPlace } },
                    { runValidators: true }
                )
            }
        },
        addTrip: async (parent, { name, location, startDate, endDate, userId }, context) => {
            if (context.user) {
                const trip = await Trip.create({ userId: context.user._id, name, location, startDate, endDate })
                
                await User.findOneAndUpdate(
                    context.user._id,
                    { $addToSet: { trips: trip._id }},
                    { runValidators: true }
                );
    
                const token = signToken(user);
    
                return { token, user };
            } else {
                const trip = await Trip.create({ userId, name, location, startDate, endDate  })
                
                await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { trips: trip._id }},
                    { runValidators: true }
                );
    
                const token = signToken(user);
    
                return { token, user };
            }
        },
        editTrip: async (parent, { _id, tripInfo }, context) => {
            const trip = await Trip.findOneAndUpdate(
                _id,
                { tripInfo },
                { new: true }
            );

            return trip;
        },
        removeTrip: async (parent, { _id }) => {
            const trip = await Trip.findOneAndDelete(_id);

            await User.findOneAndUpdate(
                { trips: trip._id },
                { $pull: { trips: trip._id } },
                { new: true, runValidators: true }
            );

            // await User.findOneAndUpdate(
            //     { _id: trip.userId },
            //     { $pull: { trips: trip._id } },
            //     { runValidators: true }
            // );

            return trip;
        },
        addHotel: async (parent, { tripId, hotelInfo }, context) => {
            const hotel = await Hotel.create({ hotelInfo });

            await Trip.findOneAndUpdate(
                { _id: tripId },
                { $addToSet: { hotelId: hotel._id } },
                { new: true, runValidators: true }
            );
        },
        editHotel: async (parent, { _id, hotelInfo }) => {
            const hotel = await Hotel.findOneAndUpdate(
                { _id },
            );
        },
        removeHotel: async (parent, { _id }) => {
            const hotel = await Hotel.findOneAndDelete(_id);

            const transportation = await Transportation.findOne({ hotel: hotel._id });
        }
    }
}

module.exports = resolvers;