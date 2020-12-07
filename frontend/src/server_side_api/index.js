import axios from "axios";
import { isEmpty } from "lodash";
import cities from "../utils/cities";

const token =
  "glNhAoV9ZrjNCtSH9TKIVdK9s6PKxObpzMe790OeqZhDovqDsY4RLmux7bvllXGc";

const simpleGraphQlQuerry = async (query, variables = {}) => {
  const response = await axios("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRFToken": token,
      cookie: `csrftoken=${token}`,
    },
    data: { query, variables },
  });

  if ("data" in response.data) {
    return response.data.data;
  }
  return {};
};

export const fetchGameroom = async (id) => {
  const gameRoom = await simpleGraphQlQuerry(
    `query getRooms {
      gameRoom {
        id
        name
        description
        img
        rating
      }
    }`
  );
  const rooms = gameRoom.gameRoom.filter((item) => item.id === id);

  return isEmpty(rooms) ? {} : rooms[0];
};

export const fetchGamerooms = async () => {
  const gameRooms = await simpleGraphQlQuerry(
    `query getRooms {
      gameRoom {
        id
        name
        description
        img
        rating
      }
    }`
  );
  return gameRooms.gameRoom;
};

export const fetchLocations = async () =>
  cities.map((city, idx) => ({
    name: city,
    id: idx,
  }));

export const fetchSuggestionData = async () => {
  const gameRooms = await simpleGraphQlQuerry(
    `query getRooms {
      gameRoom {
        id
        name
        description
        img
        rating
      }
    }`
  );

  const locations = await fetchLocations();

  const result = [
    {
      name: "Room Escapes",
      category: "ROOM",
      data: gameRooms.gameRoom,
    },
    {
      name: "Locations",
      category: "LOCATION",
      data: locations,
    },
  ];
  return result;
};
