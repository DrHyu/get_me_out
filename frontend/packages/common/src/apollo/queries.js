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

export const allRoomIdsQuery = gql`
  query {
    gameRooms {
      edges {
        node {
          roomId
        }
      }
    }
  }
`;

export const fetchGameRoomByIdQuery = gql`
  query {
    gameRooms(first: 1) {
      edges {
        node {
          roomId
          roomName
          roomImg
        }
      }
    }
  }
`;

export const FILTER_PARAMS = {
  COUNTRY_ID: "countryId",
  STATE_ID: "stateId",
  CITY_ID: "cityId",
  MIN_PLAYERS: "numPlayersMin",
  MAX_PLAYERS: "numPlayersMax",
  MIN_RATING: "ratingMin",
  MAX_RATING: "ratingMax",
  CATEGORIES: "categories",
  MIN_PRICE: "priceMin",
  MAX_PRICE: "priceMax",
  DIFFICULTY_LEVELS: "difficultyLevels",
};

export const gameRoomSearch = gql`
  query(
    $${FILTER_PARAMS.COUNTRY_ID}: Int
    $${FILTER_PARAMS.STATE_ID}: Int
    $${FILTER_PARAMS.CITY_ID}: Int
    $${FILTER_PARAMS.MIN_PLAYERS}: Int
    $${FILTER_PARAMS.MAX_PLAYERS}: Int
    $${FILTER_PARAMS.MIN_RATING}: Float
    $${FILTER_PARAMS.MAX_RATING}: Float
    $${FILTER_PARAMS.CATEGORIES}: [Int]
    $${FILTER_PARAMS.MIN_PRICE}: Float
    $${FILTER_PARAMS.MAX_PRICE}: Float
    $${FILTER_PARAMS.DIFFICULTY_LEVELS}: [Int]
  ) {
    gameRoomSearch(
      ${FILTER_PARAMS.COUNTRY_ID}: $${FILTER_PARAMS.COUNTRY_ID}
      ${FILTER_PARAMS.STATE_ID}: $${FILTER_PARAMS.STATE_ID}
      ${FILTER_PARAMS.CITY_ID}: $${FILTER_PARAMS.CITY_ID}
      ${FILTER_PARAMS.MIN_PLAYERS}: $${FILTER_PARAMS.MIN_PLAYERS}
      ${FILTER_PARAMS.MAX_PLAYERS}: $${FILTER_PARAMS.MAX_PLAYERS}
      ${FILTER_PARAMS.MIN_RATING}: $${FILTER_PARAMS.MIN_RATING}
      ${FILTER_PARAMS.MAX_RATING}: $${FILTER_PARAMS.MAX_RATING}
      ${FILTER_PARAMS.CATEGORIES}: $${FILTER_PARAMS.CATEGORIES}
      ${FILTER_PARAMS.MIN_PRICE}: $${FILTER_PARAMS.MIN_PRICE}
      ${FILTER_PARAMS.MAX_PRICE}: $${FILTER_PARAMS.MAX_PRICE}
      ${FILTER_PARAMS.DIFFICULTY_LEVELS}: $${FILTER_PARAMS.DIFFICULTY_LEVELS}
    ) {
      roomId
      roomName
      roomRating
      roomMinPlayers
      roomMaxPlayers
      roomImg
      roomPrice
      roomRelatedCategories {
        edges {
          node {
            categoryId
            categoryName
          }
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
