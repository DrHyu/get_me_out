import axios from "axios";
import cities from "../../utils/cities";

const cityItems = cities.map((city, idx) => ({
  name: city,
  id: idx,
  category: "LOCATION",
}));

export const fetchSuggestionData = async (search) => {
  console.log("start");
  const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames`;
  const response = await axios.get(roomSearchEndpoint);
  const data = response.data.map((item) => ({ ...item, category: "ROOM" }));
  const result = [
    { name: "Room Escapes", data: data },
    { name: "Locations", data: cityItems },
  ];
  console.log(result);
  return result;
};

export const updateSuggestions = async (search) => {
  const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames?search=${search}`;
  const response = await axios.get(roomSearchEndpoint);
  const data = response.data.map((item) => ({ ...item, category: "ROOM" }));

  const filteredCities = cityItems.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );
  return composeSuggestions(data, filteredCities);
};
