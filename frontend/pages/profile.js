import React from "react";

import Layout from "../src/components/layout/Layout";
import UserAvatar from "../src/components/profile/UserAvatar";
import UserAchievements from "../src/components/profile/UserAchievements";
import UserRecentActivity from "../src/components/profile/UserRecentActivity";
import UserStatsPlot from "../src/components/profile/UserStatsPlot";

import AuthRequired from "../src/components/shared/AuthRequired";

import { Row, Col } from "react-bootstrap";
import Box from "../src/components/shared/Box";

import styled from "styled-components";

const HeadSpace = styled.div`
  height: 50px;
`;

const SuggestionsPlaceholder = styled.div`
  height: 300px;
  background-color: royalblue;
  margin-bottom: 10px;
  margin-top: 10px;
`;

function Profile() {
  return (
    <AuthRequired>
      <Layout>
        <Row>
          <HeadSpace></HeadSpace>
        </Row>
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
      </Layout>
    </AuthRequired>
  );
}

export default Profile;
