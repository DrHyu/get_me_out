import React from "react";

import PT from "prop-types";

import RadioFilter from "./RadioFilter";
import MultipleChoiceFilter from "./MultipleChoiceFilter";
import RangeFilter from "./RangeFilter";
import SliderFilter from "./SliderFilter";

export const RANGE_FILTER = "RANGE_FILTER";
export const SLIDER_FILTER = "SLIDER_FILTER";
export const CHOICE_FILTER = "CHOICE_FILTER";
export const DATE_FILTER = "DATE_FILTER";
export const MULT_CHOICE_FILTER = "MULT_CHOICE_FILTER";

export const filterKindToComponent = {
  RANGE_FILTER: RangeFilter,
  SLIDER_FILTER: SliderFilter,
  CHOICE_FILTER: RadioFilter,
  MULT_CHOICE_FILTER: MultipleChoiceFilter,
};

export default function BaseFilter({ kind, ...props }) {
  const SomeFilterComponent = filterKindToComponent[kind];
  return <SomeFilterComponent {...props} />;
}

const propTypes = {
  kind: PT.string.isRequired,
};

BaseFilter.propTypes = propTypes;
