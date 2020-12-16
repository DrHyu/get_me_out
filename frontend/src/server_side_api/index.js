import axios from "axios";
import { isEmpty } from "lodash";
import cities from "../utils/cities";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const token =
  "tWWL8EApnSg04afjS2rwIGKFhMvbnwgXnTGiUwrJw3B8V56JVkR6seAvijcHnXtD";

const simpleGraphQlQuerry = async (query, variables = {}) => {
  let response = {};
  try {
    response = await axios("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRFToken": token,
        Cookie: `csrftoken=${token}`,
      },
      data: { query, variables },
    });
  } catch (err) {
    // console.log(err);
    if ("response" in err && "data" in err.response) {
      let errMsg = `Error while fetching from GraphQl:\n`;
      errMsg += `Querry:\n${query}\n`;
      errMsg += `Variables: ${JSON.stringify(variables)}\n`;
      errMsg = err.response.data.errors.reduce(
        (accumulated, cur) =>
          `${accumulated}${cur.message}\n${JSON.stringify(cur.locations)}\n`,
        errMsg
      );
      throw errMsg;
    } else {
      throw err;
    }
  }

  if ("data" in response && "data" in response.data) {
    return response.data.data;
  }
  return {};
};

export const fetchGameroom = async (id) => {
  const gameRooms = await simpleGraphQlQuerry(
    `query getRooms {
      gameRooms {
        edges {
          node {
            gameRoomId
            name
            rating
            gameCenter{
              centerId
            }
            description
            img
          }
        }
      }
    }`
  );
  const rooms = gameRooms.gameRoom.edges
    .map((edge) => ({
      ...edge.node,
      id: edge.node.gameRoomId,
    }))
    .filter((item) => item.id === id);
  // const rooms = gameRoom.gameRoom.filter((item) => item.id === id);

  return isEmpty(rooms) ? {} : rooms[0];
};

export const fetchGamerooms = async () => {
  const gameRooms = await simpleGraphQlQuerry(
    `query getRooms {
      gameRooms {
        edges {
          node {
            gameRoomId
            name
            rating
            gameCenter{
              centerId
            }
            description
            img
          }
        }
      }
    }`
  );
  const temp = gameRooms.gameRooms.edges.map((edge) => ({
    ...edge.node,
    id: edge.node.gameRoomId,
    img: edge.node.img.replace(/.*\/(\d+)_grid.*/, "/room_img/room_$1.jpg"),
  }));

  return temp;
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
