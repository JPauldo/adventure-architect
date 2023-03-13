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
    }

    input TripInfo {
        name: String
        location: String
        startingDate: String 
        endingDate: String
    }

    type Hotel {
        _id: ID!
        name: String
        address: String
        phoneNumber: String
        checkIn: String
        checkOut: String
    }

    input HotelInfo {
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
        boardingTime: String
    }

    input TrainInfo {
        company: String
        station: String
        carNumber: String
        boardingTime: String
        boardingTime: String
    }

    type Car {
        _id: ID!
        rental: Boolean
        company: String
        pickUpTime: String
        returnTime: String
        carModel: String
    }

    input CarInfo {
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

    input FlightInfo {
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

    input DayInfo {
        date: String
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
        latitude: Number
        longitude: Number
    }

    input ItemInfo {
        category: String
        startTime: String
        endTime: String
        name: String
        address: String
        notes: String
        latitude: Number
        longitude: Number
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

        getSingleHotel(hotelId: String!): Hotel
        getSingleTrain(trainId: String!): Train
        getSingleCar(carId: String!): Car
        getSingleFlight(flightId: String!): Flight

        getSingleDay(dayId: String!): Day

        getSingleItem(itemId: String!): Item
    }

    # Create, Update, Delete operations
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): Auth
        addToBucketList(userId: ID!, bucketPlace: BucketPlace!)
        updateBucketList(userId: ID!, bucketPlace: BucketPlace) 
        removeFromBucketList(_id: ID!)
        addTrip(userId: ID!, tripInfo: TripInfo!)
        updateTrip(_id: ID!, tripInfo: TripInfo)
        removeTrip(_id: ID!)
        addHotel(tripId: ID!, hotelInfo: HotelInfo!)
        updateHotel(tripId: ID!, hotelInfo: HotelInfo)
        removeHotel(_id: ID!)
        addTrain(userId: ID!, tripId: ID!, trainInfo: TrainInfo!)
        updateTrain(_id: ID!, trainInfo: TrainInfo)
        removeTrain(trainId: ID!, tripId: ID!)
        addCar(userId: ID!, tripId: ID!, rental: Boolean!, carInfo: CarInfo)
        updateCar(_id: ID!, carInfo: CarInfo)
        removeCar(carId: ID!, tripId: ID!)
        addFlight(userId: ID!, tripId: ID!, flightInfo: FlightInfo!)
        updateFlight(_id: ID!, flightInfo: FlightInfo)
        removeFlight(flightId: ID!, userId: ID!)
        addDays(userId: ID, dayInfo: DayInfo!, noOfDays: Number!)
        updateDay(tripId: ID!, dayInfo: DayInfo)
        removeDay(_id: ID!)
        addItem(dayId: ID!, itemInfo: ItemInfo!)
        updateItem(dayId: ID!, itemInfo: ItemInfo)
        removeItem(_id: ID!)
    }

`;

module.exports = typeDefs;
