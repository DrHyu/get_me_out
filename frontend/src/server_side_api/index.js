import axios from "axios";
import cities from "../utils/cities";

import { isEmpty } from "lodash";

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

export const fetchLocations = async () => {
  return cities.map((city, idx) => ({
    name: city,
    id: idx,
  }));
};

export const fetchSuggestionData = async (search) => {
  const gameRooms = await fetchGamerooms();
  const locations = await fetchLocations();

  const result = [
    {
      name: "Room Escapes",
      data: gameRooms.map((item) => ({ ...item, category: "ROOM" })),
    },
    {
      name: "Locations",
      data: locations.map((item) => ({ ...item, category: "LOCATION" })),
    },
  ];
  console.log(result);
  return result;
};
