import { gql } from "@apollo/client";

export const allRoomLocationsQuery = gql`
  {
    cities {
      edges {
        node {
          cityName
          cityId
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

export const roomCategoriesQuery = gql`
  query {
    categories {
      edges {
        node {
          categoryName
          categoryId
        }
      }
    }
  }
`;

export const listOfCitiesQuery = gql`
  {
    cities {
      edges {
        node {
          cityId
          cityName
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
