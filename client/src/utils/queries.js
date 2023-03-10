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

export const QUERY_SINGLE_USER  = gql`
    query getSingleUser(firstName: String!, lastName: String!) {
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


