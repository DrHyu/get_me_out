import axios from "axios";

export default [];

export const FILTER_PARAMS = {
  COUNTRY_ID: "country_id",
  STATE: "state_id",
  CITY: "city_id",
  MIN_PLAYERS: "num_players_min",
  MAX_PLAYERS: "num_players_max",
  MIN_RATING: "rating_min",
  MAX_RATING: "rating_max",
  CATEGORIES: "categories",
  MIN_PRICE: "price_min",
  MAX_PRICE: "price_max",
  MIN_DIFFICULTY: "difficulty_min",
  MAX_DIFFICULTY: "difficulty_max",
};

export const fetchFilteredRoomScapes = async (filterParams = {}) => {
  let response = {};
  try {
    response = await axios.post(
      "http://localhost:8080/gamerooms/game_room/smart_filter",
      filterParams
    );
  } catch (err) {
    console.log(err);
    return [];
  }
  return response.data;
};
