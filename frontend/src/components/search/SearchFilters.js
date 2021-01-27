import React from "react";

import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  roomCategoriesQuery,
  listOfCitiesQuery,
} from "../../lib/apollo/queries";

import RangeFilter from "./filters/RangeFilter";
import SliderFilter from "./filters/SliderFilter";
import RadioFilter from "./filters/RadioFilter";
import MultipleChoiceFilter from "./filters/MultipleChoiceFilter";

import { FILTER_PARAMS } from "../../lib/axios/queries";

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

function SearchFilterAll({ filterUpdatedCallback, ...routerQueries }) {
  const { data: categories } = useQuery(roomCategoriesQuery);
  const { data: cities } = useQuery(listOfCitiesQuery);

  /* Transform from filter descriptor to react component */
  return (
    <FilterWrapper>
      <RangeFilter
        title="Price"
        min={0}
        max={100}
        initialValue={25}
        tooltipTemplate={(val) => `${val} $`}
        onChangeCallback={([min, max]) => {
          const updates = {};
          updates[FILTER_PARAMS.MIN_PRICE] = min;
          updates[FILTER_PARAMS.MAX_PRICE] = max;
          filterUpdatedCallback(updates);
        }}
      />
      <FilterSeparator />
      <RangeFilter
        title="Difficulty"
        min={0}
        max={2}
        options={["Easy", "Medium", "Hard"]}
        marks={{ 0: "easy", 1: "medium", 2: "hard" }}
        step={1}
        onChangeCallback={([min, max]) => {
          const updates = {};
          updates[FILTER_PARAMS.MIN_DIFFICULTY] = min;
          updates[FILTER_PARAMS.MAX_DIFFICULTY] = max;
          filterUpdatedCallback(updates);
        }}
      />
      <FilterSeparator />
      <MultipleChoiceFilter
        title="Category"
        options={categories.categories.edges.map(
          (edge) => edge.node.categoryName
        )}
        initialValue={categories.categories.edges.map(() => false)}
        onChangeCallback={(selected) => {
          const updates = {};
          updates[
            FILTER_PARAMS.CATEGORIES
          ] = categories.categories.edges
            .filter((edge, idx) => !selected[idx])
            .map((edge) => edge.node.categoryName);
          filterUpdatedCallback(updates);
        }}
      />
      <FilterSeparator />
      <MultipleChoiceFilter
        title="Cities"
        options={cities.cities.edges.map((edge) => edge.node.cityName)}
        /** If city was passed as a POST/GET parameter, and we have this city, it should start as selected */
        initialValue={cities.cities.edges.map(
          (edge) => routerQueries?.city === edge.node.cityName
        )}
        onChangeCallback={(selected) => {
          const updates = {};
          updates[FILTER_PARAMS.CITY] = cities.cities.edges
            .filter((edge, idx) => !selected[idx])
            .map((edge) => edge.node.cityName);
          // TODO pending api fix
          // filterUpdatedCallback(updates);
        }}
      />
      <FilterSeparator />
      <RangeFilter
        title="Rating"
        min={0}
        max={10}
        tooltipTemplate={(val) => `${val} :)`}
        onChangeCallback={([min, max]) => {
          const updates = {};
          updates[FILTER_PARAMS.MIN_RATING] = min;
          updates[FILTER_PARAMS.MAX_RATING] = max;
          filterUpdatedCallback(updates);
        }}
      />
    </FilterWrapper>
  );
}

export default SearchFilterAll;
