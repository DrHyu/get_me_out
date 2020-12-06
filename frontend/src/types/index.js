import { shape, number, string, arrayOf } from "prop-types";

export const roomType = shape({
  id: number.isRequired,
  name: string.isRequired,
  img: string,
  rating: number,
  terror_rating: number,
  description: string,
  location: string,
  owner: string,
});

export const searchBarData = arrayOf(
  shape({
    groupName: string,
    category: string,
    data: arrayOf(roomType),
  })
);
