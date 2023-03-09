const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String
        lastName: String
        email: String
        password: String
        bucket: [BucketPlaces]
    }

    type BucketPlaces {
        name: String
        location: String
    }

    type Trip {
        name: String
        location: String
        transport: Transportation
        startingDate: String 
        endingDate: String
        hotel: Hotel
        daysOfTrip: Day 
    }

    type Hotel {
        name: String
        address: String
        phoneNumber: String
        checkIn: String
        checkOut: String
    }

    type Transportation {
        train: Train
        car: Car
        flight: Flight
    }

    type Train {
        company: String
        station: String
        carNumber: String
        boardingTime: String
        departureTime: String
    }

    type Car {
        rental: Boolean
        company: String
        pickUpTime: String
        returnTime: String
        carModel: String
    }

    type Flight {
        airline: String
        airport: String
        gate: String
        flightTime: String
        boardingTime: String
        parkingSpot: String
    }

    type Day {
        date: String
        items: [Item]
        notes: String
    }

    type Item {
        category: String
        startTime: String
        endTime: String
        name: String
        address: String
        notes: String
        latitude: float
        longitude: float
    }

    # Read operations 
    type Query {
        getAllUsers: [User]
    }
`;

module.exports = typeDefs;
