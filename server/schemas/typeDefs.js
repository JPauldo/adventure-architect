const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    bucketList: [BucketList]
    trips: [Trip]
  }

  type BucketList {
    name: String
    location: String
  }

  input BucketInfo {
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
  }

  input TrainInfo {
    company: String
    station: String
    carNumber: String
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
    latitude: Float
    longitude: Float
  }

  input ItemInfo {
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
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): Auth

    addToBucketList(userId: ID!, bucketPlace: BucketPlace!): User
    updateBucketList(userId: ID!, bucketPlace: BucketPlace): User
    removeFromBucketList(_id: ID!): User

    addTrip(userId: ID!, tripInfo: TripInfo!): Auth
    updateTrip(_id: ID!, tripInfo: TripInfo): Auth
    removeTrip(_id: ID!): Trip
    addHotel(tripId: ID!, hotelInfo: HotelInfo!): Hotel
    updateHotel(tripId: ID!, hotelInfo: HotelInfo): Hotel
    removeHotel(_id: ID!): Hotel

    addTrain(userId: ID!, tripId: ID!, trainInfo: TrainInfo!): Trip
    updateTrain(_id: ID!, trainInfo: TrainInfo): Trip
    removeTrain(trainId: ID!, tripId: ID!): Trip
    addCar(userId: ID!, tripId: ID!, rental: Boolean!, carInfo: CarInfo): Car
    updateCar(_id: ID!, carInfo: CarInfo): Car
    removeCar(carId: ID!, tripId: ID!): Car
    addFlight(userId: ID!, tripId: ID!, flightInfo: FlightInfo!): Flight
    updateFlight(_id: ID!, flightInfo: FlightInfo): Flight
    removeFlight(flightId: ID!, userId: ID!): Flight

    addDays(userId: ID, dayInfo: DayInfo!, noOfDays: Int!): Day
    updateDay(tripId: ID!, dayInfo: DayInfo): Day
    removeDay(_id: ID!): Day
    addItem(dayId: ID!, itemInfo: ItemInfo!): Day
    updateItem(dayId: ID!, itemInfo: ItemInfo): Day
    removeItem(_id: ID!): Day
  }
`;

module.exports = typeDefs;
