import React from "react";

import Box from "../../shared/Box";

const routes = [
  "The Silk Road",
  "The Spice Routes",
  "The Incense Route",
  "The Amber Road",
  "The Tea Horse Road",
  "The Salt Route",
  "The Trans-Saharan Trade Route",
  "The Tin Route",
];

function RoutesTab() {
  return routes.map((route) => <Box title={route} key={route} />);
}

export default RoutesTab;
