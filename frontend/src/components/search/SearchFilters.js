import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { updateFilterValue } from "../../store/search/actions";

import BaseFilter, {
  RANGE_FILTER,
  SLIDER_FILTER,
  CHOICE_FILTER,
  MULT_CHOICE_FILTER,
} from "./filters";

const FilterWrapper = styled.div`
  border-radius: 16px 16px 16px 16px;
  /* border: 1px solid gray; */
  /* padding: 32px; */
  position: relative;
`;

const FilterSeparator = styled.div`
  position: relative;
  margin-left: 5%;
  width: 90%;
  height: 1px;
  border-bottom: 1px solid gray;

  &:last-child {
    border: none;
  }
`;

const filters = [
  {
    kind: RANGE_FILTER,
    title: "Price",
    filterAttr: "price",
    id: 1,
    min: 0,
    max: 100,
    initialValue: 25,
    tooltipTemplate: (val) => `${val} $`,
  },
  {
    kind: CHOICE_FILTER,
    title: "dummy2",
    filterAttr: "open",
    id: 2,
    options: ["open", "closed"],
    optionsToAttrMapping: [false, true],
    optionsToAttrMappingMode: "OR",
    initialValue: [true, false],
  },
  {
    kind: MULT_CHOICE_FILTER,
    title: "Difficulty",
    id: 3,
    options: ["easy", "medium", "hard"],
    filterAttr: "difficulty",
    optionsToAttrMapping: ["easy", "medium", "hard"],
    optionsToAttrMappingMode: "OR", // vs AND
    initialValue: [true, true, false],
  },
  {
    kind: RANGE_FILTER,
    title: "Difficulty",
    id: 4,
    options: ["Easy", "Medium", "Hard"],
    marks: { 0: "easy", 1: "medium", 2: "hard" },
    min: 0,
    max: 2,
    step: null,
  },
  {
    kind: MULT_CHOICE_FILTER,
    title: "Category",
    id: 4,
    options: ["Action", "Adventure", "Sci-Fi", "Terror", "Mistery"],
    filterAttr: "difficulty",
    optionsToAttrMapping: [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Terror",
      "Mistery",
    ],
    optionsToAttrMappingMode: "OR", // vs AND
    initialValue: [true, true, false, true, false],
  },
];

function SearchFilterAll() {
  const activeFilters = filters;
  const dispatch = useDispatch();
  /* Transform from filter descriptor to react component */
  return (
    <FilterWrapper>
      {activeFilters.map((filter) => (
        <Fragment key={`${filter.id}_${filter.title}`}>
          <BaseFilter
            onChangeCallback={(value) => {
              // dispatch(updateFilterValue(filter.id, value));
            }}
            {...filter}
          />
          <FilterSeparator />
        </Fragment>
      ))}
    </FilterWrapper>
  );
}

export default SearchFilterAll;
