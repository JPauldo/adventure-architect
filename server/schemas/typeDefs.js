const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String
        lastName: String
        email: String
        password: String
        bucket: [BucketPlace]
        trips: [Trip]
    }

    type BucketPlace {
        name: String
        location: String
    }

    type Trip {
        _id: ID!
        name: String
        location: String
        startingDate: String 
        endingDate: String
        hotel: Hotel
        transport: Transportation
        daysOfTrip: [Day] 
        userId: ID
    }

    type Hotel {
        _id: ID!
        name: String
        address: String
        phoneNumber: String
        checkIn: String
        checkOut: String
    }

    type Transportation {
        _id: ID!
        flight: Flight
        train: Train
        car: Car
    }

    type Train {
        _id: ID!
        company: String
        station: String
        carNumber: String
        boardingTime: String
        departureTime: String
    }

    type Car {
        _id: ID!
        rental: Boolean
        company: String
        pickUpTime: String
        returnTime: String
        carModel: String
    }

    type Flight {
        _id: ID!
        airline: String
        airport: String
        gate: String
        flightTime: String
        boardingTime: String
        parkingSpot: String
    }

    type Day {
        _id: ID!
        date: String
        items: [Item]
        notes: String
    }

    type Item {
        _id: ID!
        category: String
        startTime: String
        endTime: String
        name: String
        address: String
        notes: String
        latitude: Float
        longitude: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    # Read operations 
    type Query {
        getMe(firstName: String, lastName: String): User
        getSingleUser(firstName: String!, lastName: String!): User
        getAllUsers: [User]

        getSingleTrip(tripId: String!): Trip
        getTripsByUser(userId: String!): [Trip]
        getAllTrips: [Trip]
    }

    # Create, Update, Delete operations
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): Auth
    }
`;

module.exports = typeDefs;
