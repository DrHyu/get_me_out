import React, { useEffect } from "react";

import RecentActivityItem from "./RecentActivityItem";
import Box from "../../shared/Box";

function UserRecentActivity() {
  const roomSuggestions = [];

  return (
    <Box title="Recent Activity">
      {roomSuggestions.map((roomSuggestion, idx) => (
        <RecentActivityItem
          key={`${roomSuggestion.id}`}
          room={roomSuggestion}
          idx={idx}
        />
      ))}
    </Box>
  );
}

export default UserRecentActivity;
