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

        //Get single user
        getSingleUser: async (parent, { firstName, lastName }) => {
            const user = await User.findOne({ firstName, lastName });
            return user;
        },

        // Get all users in DB
        getAllUsers: async (parent, args) => {
            return await User.find({});
        },

        //Get single Trip
        getSingleTrip: async (parent, { tripId }) => {
            const trip = await Trip.findOne({ _id: tripId });
            return trip;
        },

        //Get trip by user
        getTripsByUser: async (parent, args, context) => {
            if (context.user) {
                const trips = await Trip.find({ userId: context.user._id })
                return trips;
            } else if (args.userId) {
                const trips = await Trip.find({ userId: args.userId })
                return trips;
            }
        },

        //Get all trips
        getAllTrips: async (parent, args) => {
            return await Trip.find({});
        },

        // Get single hotel
        getSingleHotel: async (parent, { hotelId }) => {
            const hotel = await Hotel.findOne({ _id: hotelId });
            return hotel;
        },

        //Get single train
        getSingleTrain: async (parent, { trainId }) => {
            const train = await Train.findOne({ _id: trainId });
            return train;
        },

        //Get single car
        getSingleCar: async (parent, { carId }) => {
            const car = await Car.findOne({ _id: carId });
            return car;
        },

        //Get single flight
        getSingleFlight: async (parent, { flightId }) => {
            const flight = await Flight.findOne({ _id: flightId });
            return flight;
        },

        //Get single day
        getSingleDay: async (parent, { dayId }) => {
            const day = await Day.findOne({ _id: dayId }).populate('items');
            return day;
        },

        //Get single item
        getSingleItem: async (parent, { itemId }) => {
            const item = await Item.findOne({ _id: itemId });
            return item;
        },

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
    }
}

module.exports = resolvers;