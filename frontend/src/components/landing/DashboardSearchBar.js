import React from "react";

import AutocompleteBar from "../autocomplete/Autocomplete";
import { searchBarData } from "../../types";

const DashboardSearchBar = ({ initialSearchBoxData }) => (
  <AutocompleteBar initialSearchBoxData={initialSearchBoxData} />
);

DashboardSearchBar.propTypes = {
  initialSearchBoxData: searchBarData.isRequired,
};
DashboardSearchBar.defaultProps = {};

export default DashboardSearchBar;
