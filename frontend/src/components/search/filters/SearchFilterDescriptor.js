import SearchFilterRadio from "./SearchFilterRadio";
import SearchFilterSlider from "./SearchFilterSlider";

import { cloneDeep, remove } from "lodash";

export const RANGE_FILTER = "RANGE_FILTER";
export const CHOICE_FILTER = "CHOICE_FILTER";
export const DATE_FILTER = "DATE_FILTER";

export const filterKindToComponent = {
  RANGE_FILTER: SearchFilterSlider,
  CHOICE_FILTER: SearchFilterRadio,
};

export const filterData = (activeFilters, data) => {
  const outData = cloneDeep(data);

  if (typeof data === "undefined" || data.length === 0) {
    return [];
  }
  if (typeof activeFilters === "undefined" || activeFilters.length === 0) {
    return data;
  }

  activeFilters.forEach((filter) => {
    remove(outData, (d) => {
      if (!(filter.filterAttr in d)) {
        /* Exclude */
        return true;
      } else if (
        filter.kind === RANGE_FILTER &&
        d[filter.filterAttr] < filter.value
      ) {
        /* Exclude */
        return true;
      } else if (
        filter.kind === CHOICE_FILTER &&
        d[filter.filterAttr] !== filter.optionsToAttrMapping[filter.value]
      ) {
        /* Exclude */
        return true;
      } else {
        /* Keep the value */
        return false;
      }
    });
  });
  return outData;
};

class SearchFilterDescriptor {
  constructor(params) {
    const { react_component, ...settings } = params;
    this.react_component = react_component;
    this.settings = settings;
  }

  static radio_filter(title, values) {
    const params = {
      react_component: SearchFilterRadio,
      title: title,
      values: values,
    };
    return new SearchFilterDescriptor(params);
  }

  static slider_filter(title, min, max) {
    const params = {
      react_component: SearchFilterSlider,
      title: title,
      min: min,
      max: max,
    };
    return new SearchFilterDescriptor(params);
  }
}

export default SearchFilterDescriptor;
