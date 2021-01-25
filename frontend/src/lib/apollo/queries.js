import { gql } from "@apollo/client";

export const allRoomLocationsQuery = gql`
  {
    cities {
      edges {
        node {
          cityName
        }
      }
    }
  }
`;

export const allRoomNamesQuery = gql`
  {
    gameRooms {
      edges {
        node {
          roomId
          roomName
        }
      }
    }
  }
`;

export const suggestedRoomsQuery = gql`
  {
    gameRooms(first: 3) {
      edges {
        node {
          roomId
          roomName
          roomImg
          roomRating
          roomDescription
        }
      }
    }
  }
`;

export default {
  allRoomLocationsQuery,
  allRoomNamesQuery,
  suggestedRoomsQuery,
};
