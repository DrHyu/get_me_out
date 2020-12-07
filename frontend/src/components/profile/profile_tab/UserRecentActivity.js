import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RecentActivityItem from "./RecentActivityItem";
import Box from "../../shared/Box";
import { fetchRoomSuggestions } from "../../../store/dashboard/actions";

function UserRecentActivity() {
  const roomSuggestions = useSelector(
    (state) => state.dashboard.roomSuggestions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

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
