import { cloneDeep } from "lodash";

// import {
//   RANGE_FILTER,
//   CHOICE_FILTER,
//   DATE_FILTER,
//   MULT_CHOICE_FILTER,
// } from "./Filters";

export const filterData = (activeFilters, data) => {
  const outData = cloneDeep(data);
  return outData;
  // if (typeof data === "undefined" || data.length === 0) {
  //   return [];
  // }
  // if (typeof activeFilters === "undefined" || activeFilters.length === 0) {
  //   return data;
  // }
  // activeFilters.forEach((fltr) => {
  //   if (typeof fltr.filterAttr == "undefined") {
  //     return; // a.k.a continue
  //   }
  //   remove(outData, (d) => {
  //     if (!(fltr.filterAttr in d)) {
  //       /* Exclude */
  //       return true;
  //     } else if (
  //       fltr.kind === RANGE_FILTER &&
  //       d[fltr.filterAttr] < fltr.value
  //     ) {
  //       /* Exclude */
  //       return true;
  //     } else if (
  //       fltr.kind === CHOICE_FILTER ||
  //       fltr.kind === MULT_CHOICE_FILTER
  //     ) {
  //       /* Inclusive - must match at least one of the fields */
  //       let tgtAttr = d[fltr.filterAttr];
  //       /* We are only looking for the fields which are checked (value===True) */
  //       let valuesSearched = fltr.optionsToAttrMapping.filter(
  //         (_, idx) => fltr.value[idx]
  //       );

  //       if (fltr.optionsToAttrMappingMode === "OR") {
  //         /* Keep the data if tgtAttr matches some of valuesSearched */
  //         let found = valuesSearched.map((search) => search === tgtAttr);
  //         return !found.some((_) => _);
  //         /* Exclusive - must match ALL of the fields */
  //       } else if (fltr.optionsToAttrMappingMode === "AND") {
  //         /* TODO - Target would have to be an array */
  //         return false;
  //       }
  //     } else {
  //       /* Keep the value */
  //       return false;
  //     }
  //   });
  // });
  // return outData;
};

export const dummy = {};
