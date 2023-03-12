import { gql } from '@apollo/client';


export const QUERY_ME = gql`
    query getMe {
        _id
        firstName
        lastName
        # Confirm if bucket is wanted here.It's not in getMe resolvers.
        bucket {
            name
            location
        }
        trips {
            _id
        }
    } 
`;

export const QUERY_SINGLE_USER = gql`
    query getSingleUser($firstName: String!, $lastName: String!) {
        user(firstName: $firstName, lastname: $lastName) {
            _id
        firstName
        lastName
        # Confirm if bucket is wanted here.It's not in getMe resolvers.
        bucket {
            name
            location
        }
        trips {
            _id
        }
      } 
   }
`;

export const QUERY_USERS = gql`
    query getAllUsers {
        _id
        firstName
        lastName
        # Confirm if bucket is wanted here.It's not in getMe resolvers.
        bucket {
            name
            location
        }
        trips {
            _id
        }
    } 
`;

export const QUERY_SINGLE_TRIP = gql`
    query getSingleTrip($tripId: ID!) {
        trip(tripId: $tripId) {
            _id
            name
            location
            startingDate
            endingDate
            hotel
            transport
            daysofTrip
            userId
        }
    }
`

export const QUERY_ALL_TRIPS = gql`
    query getAllTrips {
        trip {
            _id
            name
            location
            startingDate
            endingDate
            hotel
            transport
            daysofTrip
            userId
        }
    }
`;

export const QUERY_SINGLE_HOTEL = gql`
    query getSingleHotel($hotelId: ID!) {
        hotel(hotelId: $hotelId) {
            _id
            name
            address
            phoneNumber
            checkIn
            checkOut
        }
    }
`;

export const QUERY_SINGLE_TRAIN = gql`
    query getSingleTrain($trainID: ID!) {
        train(trainId: $trainId) {
            _id
          company
          station
          carNumber
          boardingTime
          departureTime  
        }
    }  

`;

export const QUERY_SINGLE_CAR = gql`
    query getSingleCar($cardId: ID!) {
        car(cardId: $cardId) {
            _id
            company
            pickUpTime
            returnTime
            carModel
        }
    }
`;

export const QUERY_SINGLE_FLIGHT = gql`
    
`