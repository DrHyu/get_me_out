import React from "react";
import { Row, Col } from "react-bootstrap";

import UserAvatar from "./UserAvatar";
import UserAchievements from "./UserAchievements";
import UserRecentActivity from "./UserRecentActivity";
import UserStatsPlot from "./UserStatsPlot";
import Box from "../../shared/Box";

function ProfileTab() {
  return (
    <Row>
      <Col sm={12} lg={4}>
        <UserAvatar />
        <UserAchievements />
      </Col>
      <Col sm={12} lg={8}>
        <UserRecentActivity />
        <UserStatsPlot />
        <Box title="Placeholder1" />
        <Box title="Placeholder2" />
      </Col>
    </Row>
  );
}

export default ProfileTab;
