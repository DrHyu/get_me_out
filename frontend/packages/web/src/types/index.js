import {
  shape,
  number,
  string,
  bool,
  arrayOf,
  oneOfType,
  func,
  instanceOf,
  Element,
  oneOf,
} from "prop-types";

export const roomType = shape({
  roomId: oneOfType([string, number]).isRequired,
  roomName: string.isRequired,
  roomImg: string,
  roomRating: number,
  roomDescription: string,
});

export const searchBarData = arrayOf(
  shape({
    name: string.isRequired,
    data: arrayOf(
      shape({
        name: string.isRequired,
        id: oneOfType([string, number]).isRequired,
      }).isRequired
    ),
  })
);

export const refProp = oneOfType([
  // Either a function
  func,
  // Or the instance of a DOM native element (see the note about SSR)
  shape({ current: instanceOf(Element) }),
]);

export const filterType = shape({
  kind: string.isRequired,
  name: string.isRequired,
  filterAttr: string,
  id: number,
  min: number,
  max: number,
  value: oneOfType([number, arrayOf(bool)]).isRequired,
  options: arrayOf(string),
  optionsToAttrMapping: arrayOf(oneOfType([string, bool])),
  optionsToAttrMappingMode: oneOf(["OR", "AND"]),
});
