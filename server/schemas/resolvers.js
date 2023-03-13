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
        // Update user info
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
        // Adds new bucket object to user
        addToBucketList: async (parent, { userId, bucketPlace }, context) => {
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

            return user;
        },
        // Update bucket list data
        updateBucketList: async (parent, { userId, bucketPlace }, context) => {
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

            return user;
        },
        // Remove bucket object
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

            return user;
        },
        // Update trip info
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
        // Remove trip info
        editTrip: async (parent, { _id, tripInfo }, context) => {
            const trip = await Trip.findOneAndUpdate(
                { _id },
                { tripInfo },
                { new: true }
            );

            return trip;
        },
        // Adds new hotel info
        removeTrip: async (parent, { _id }) => {
            const trip = await Trip.findOneAndDelete(_id);

            await User.findOneAndUpdate(
                { trips: trip._id },
                { $pull: { trips: trip._id } },
                { new: true, runValidators: true }
            );
            //     { _id: trip.userId },
            //     { $pull: { trips: trip._id } },
            //     { runValidators: true }
            // );

            return trip;
        },
        // Update hotel info
        addHotel: async (parent, { tripId, hotelInfo }, context) => {
            const hotel = await Hotel.create({ hotelInfo });

            await Trip.findOneAndUpdate(
                { _id: tripId },
                { $addToSet: { hotelId: hotel._id } },
                { new: true, runValidators: true }
            );

            return hotel;
        },
        // Remove hotel info
        editHotel: async (parent, { _id, hotelInfo }) => {
            const hotel = await Hotel.findOneAndUpdate(
                { _id },
                { hotelInfo }
            );

            return hotel;
        },
        // Update user info
        removeHotel: async (parent, { _id }) => {
            const hotel = await Hotel.findOneAndDelete(_id);

            await Trip.findOneAndUpdate({ hotel: hotel._id });

            return hotel;
        },
        // Adds new train info and adds new transportation ID to corresponding trip
        addTrain: async (parent, { userId, tripId, trainInfo }, context) => {
            const train = await Train.create({ trainInfo });

            const transport = await Transportation.create(
                { 
                    tripId: tripId,
                    trainId: train._id 
                }
            );

            await User.findOneAndUpdate(
                { _id: tripId },
                { $addToSet: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return train;
        },
        // Update train info
        editTrain: async (parent, { _id, trainInfo }) => {
            const train = await Train.findOneAndUpdate(
                { _id },
                { trainInfo }
            );

            return train;
        },
        // Remove train info
        removeTrain: async (parent, { trainId, tripId }) => {
            const train = await Train.findByIdAndDelete( trainId );

            const transport = await Transportation.findOneAndDelete({ trainId: train._id });

            await Trip.findOneAndUpdate(
                { _id: tripId },
                { $pull: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return train;
        },
        // Adds new car info and adds new transportation ID to corresponding trip
        addCar: async (parent, { userId, tripId, rental, carInfo }) => {
            if (!carInfo) {
                carInfo = {};
            }

            carInfo.rental = rental;

            const car = await Car.create({ carInfo });

            const transport = await Transportation.create(
                { 
                    tripId: tripId,
                    carId: car._id 
                }
            );

            await User.findOneAndUpdate(
                { _id: tripId },
                { $addToSet: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return car;
        },
        // Update car info
        editCar: async (parent, { _id, carInfo }) => {
            const car = await Car.findOneAndUpdate(
                { _id },
                { carInfo }
            );

            return car;
        },
        // Remove car info
        removeCar: async (parent, { carId, tripId }, context) => {
            const car = await Car.findByIdAndDelete({ _id: carId });

            const transport = await Transportation.findOneAndDelete({ tripId: tripId });

            await Trip.findOneAndUpdate(
                { _id: tripId },
                { $pull: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return car;
        },
        // Adds new flight info and adds new transportation ID to corresponding trip
        addFlight: async (parent, { userId, tripId, flightInfo }, context) => {
            const flight = await Flight.create({ flightInfo });

            const transport = await Transportation.create(
                { 
                    tripId: tripId,
                    flightId: flight._id
                }
            );

            await Trip.findOneAndUpdate(
                { _id: tripId },
                { $addToSet: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return flight;
        },
        // Update flight info
        editFlight: async (parent, { _id, flightInfo }) => {
            const flight = await Flight.findOneAndUpdate(
                { _id },
                { flightInfo }
            );

            return flight;
        },
        // Remove flight info
        removeFlight: async (parent, { flightId, tripId }, context) => {
            const flight = await Flight.findByIdAndDelete({ _id: flightId });

            const transport = await Transportation.findByIdAndDelete(
                { userId },
                { flightId: flight._id }
            );

            await Trip.findOneAndUpdate(
                { _id: userId },
                { $pull: { trips: transport._id }},
                { new: true, runValidators: true }
            );

            return flight;
        },
        // Adds days based on the number of scheduled
        addDays: async (parent, { userId, dayInfo, noOfDays }, context) => {
            for (let i = 0; i < noOfDays; i++) {
                const day = await Day.create({ dayInfo });
    
                await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { daysOfTrip: day._id } },
                    { new: true, runValidators: true }
                );
            }

            return day;
        },
        // Update day info
        editDay: async (parent, { _id, dayInfo }) => {
            const day = await Day.findOneAndUpdate(
                { _id },
                { dayInfo },
                { new: true, runValidators: true }
            );

            return day;
        },
        // Remove a day from the trip schedule
        removeDay: async (parent, { _id }) => {
            const day = await Day.findByIdAndDelete( _id );

            await User.findOneAndUpdate(
                { daysOfTrip: day._id },
                { $pull: { daysOfTrip: day._id } },
                { new: true, runValidators: true }
            );

            return day;
        },
        // Create new item for the schedule
        addItem: async (parent, { dayId, itemInfo }) => {
            const item = await Item.create({ itemInfo });

            await Day.findOneAndUpdate(
                { _id: dayId },
                { $addToSet: { items: item._id } },
                { new: true, runValidators: true }
            );

            return item;
        },
        // Update item info
        editItem: async (parent, { _id, itemInfo }) => {
            const item = await Item.findOneAndUpdate(
                { _id },
                { itemInfo },
                { new: true, runValidators: true }
            );

            return item;
        },
        // Remove item from the schedule
        removeItem: async (parent, { _id }) => {
            const item = await Item.findByIdAndDelete( _id );

            await Day.findOneAndUpdate(
                { items: item._id },
                { $pull: { items: item._id } },
                { new: true, runValidators: true }
            );

            return item;
        }
    }
}

module.exports = resolvers;