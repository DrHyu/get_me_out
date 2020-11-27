import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import RecentActivityItem from "./RecentActivityItem";
import Box from "../shared/Box";
import { fetchRoomSuggestions } from "../../store/dashboard/actions";

const RecentActivityWrapper = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UserRecentActivity() {
  const roomSuggestions = useSelector((state) => {
    return state.dashboard.roomSuggestions;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

  return (
    <Box title="Recent Activity">
      {roomSuggestions.map((roomSuggestion, idx) => (
        <RecentActivityItem key={idx} room={roomSuggestion} idx={idx} />
      ))}
    </Box>
  );
}

export default UserRecentActivity;
