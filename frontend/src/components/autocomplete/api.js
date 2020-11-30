import axios from "axios";
import cities from "../../utils/cities";

const cityItems = cities.map((city, idx) => ({
  name: city,
  id: idx,
  category: "LOCATION",
}));

export const fetchSuggestionData = async (search) => {
  const roomSearchEndpoint = `http://localhost:8080/gamerooms/public/gamerooms`;

  const response = await axios.get(roomSearchEndpoint);

  const data = response.data.map((item) => ({ ...item, category: "ROOM" }));
  const result = [
    { name: "Room Escapes", data: data },
    { name: "Locations", data: cityItems },
  ];
  console.log(result);
  return result;
};
