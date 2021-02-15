import React from "react";

import styled from "styled-components";

import { range } from "lodash";

import { useQuery } from "@apollo/client";
import {
  roomCategoriesQuery,
  listOfCitiesQuery,
  FILTER_PARAMS,
} from "@getmeout/common";

import RangeFilter from "./filters/RangeFilter";
import SliderFilter from "./filters/SliderFilter";
import RadioFilter from "./filters/RadioFilter";
import MultipleChoiceFilter from "./filters/MultipleChoiceFilter";

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
          updates[FILTER_PARAMS.DIFFICULTY_LEVELS] = range(min + 1, max + 2);
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
          const selectedCategories = categories.categories.edges
            .filter((edge, idx) => selected[idx])
            .map((edge) => edge.node.categoryId);

          /** Hacky way ...
           *  By putting undefined here it will essentially 'erase' the categories filter in the gql querry
           *  since we no longer want to filter by categories, since there is no category selected.
           */
          filterUpdatedCallback({
            [FILTER_PARAMS.CATEGORIES]:
              selectedCategories.length > 0 ? selectedCategories : undefined,
          });
        }}
      />
      <FilterSeparator />
      <RadioFilter
        title="Cities"
        options={cities.cities.edges.map((edge) => edge.node.cityName)}
        /** If city was passed as a POST/GET parameter, and we have this city, it should start as selected */
        initialValue={cities.cities.edges.map(
          (edge) => routerQueries?.city === edge.node.cityName
        )}
        onChangeCallback={(selected) => {
          const selectedCityId = cities.cities.edges
            .filter((edge, idx) => !selected[idx])
            .map((edge) => edge.node.cityId);

          if (selectedCityId.length === 1) {
            filterUpdatedCallback({
              [FILTER_PARAMS.CITY_ID]: selectedCityId[0],
            });
          } else {
            /** Hacky way ...
             *  By putting undefined here it will essentially 'erase' the city id filter in the gql querry
             *  since we no longer want to filter by city, since there is no city selected.
             */
            filterUpdatedCallback({
              [FILTER_PARAMS.CITY_ID]: undefined,
            });
          }
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
