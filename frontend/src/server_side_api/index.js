import axios from "axios";
import { isEmpty } from "lodash";
import cities from "../utils/cities";

export const fetchGameroom = async (id) => {
  const roomSearchEndpoint = `http://localhost:8080/gamerooms/public/gamerooms`;
  const response = await axios.get(roomSearchEndpoint);

  const gameRooms = response.data.filter((item) => item.id === id);
  return isEmpty(gameRooms) ? {} : gameRooms[0];
};

export const fetchGamerooms = async () => {
  const roomSearchEndpoint = `http://localhost:8080/gamerooms/public/gamerooms`;
  const response = await axios.get(roomSearchEndpoint);
  return response.data;
};

export const fetchLocations = async () =>
  cities.map((city, idx) => ({
    name: city,
    id: idx,
  }));

export const fetchSuggestionData = async () => {
  const gameRooms = await fetchGamerooms();
  const locations = await fetchLocations();

  const result = [
    {
      name: "Room Escapes",
      category: "ROOM",
      data: gameRooms,
    },
    {
      name: "Locations",
      category: "LOCATION",
      data: locations,
    },
  ];
  return result;
};
