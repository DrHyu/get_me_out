import React from "react";
import Layout from "../src/components/layout/Layout";
import UserAvatar from "../src/components/profile/UserAvatar";
import UserAchievements from "../src/components/profile/UserAchievements";
import UserRecentActivity from "../src/components/profile/UserRecentActivity";

import { Row, Col } from "react-bootstrap";

import sytled from "styled-components";
import styled from "styled-components";

const HeadSpace = styled.div`
  height: 50px;
`;

const AvatarPlaceholder = styled.div`
  /* width: 300px; */
  /* height: 300px;
  background-color: red;
  margin-bottom: 10px;
  margin-top: 10px; */
  padding-bottom: 20px;
`;

const AchievementsPlaceholder = styled.div`
  /* width: 300px; */
  /* height: 800px; */
  /* background-color: purple;
  margin-bottom: 10px;
  margin-top: 10px; */
`;

const RecentActivityPlaceholder = styled.div`
  /* height: 600px;
  background-color: rebeccapurple; */
  margin-bottom: 10px;
  margin-top: 10px;
`;

const StatsPlaceholder = styled.div`
  height: 300px;
  background-color: royalblue;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const SuggestionsPlaceholder = styled.div`
  height: 300px;
  background-color: royalblue;
  margin-bottom: 10px;
  margin-top: 10px;
`;

function Profile() {
  return (
    <Layout>
      <Row>
        <HeadSpace></HeadSpace>
      </Row>
      <Row>
        <Col sm={12} lg={4}>
          <AvatarPlaceholder>
            <UserAvatar />
          </AvatarPlaceholder>
          <AchievementsPlaceholder>
            <UserAchievements />
          </AchievementsPlaceholder>
        </Col>
        <Col sm={12} lg={8}>
          <RecentActivityPlaceholder>
            <UserRecentActivity></UserRecentActivity>
          </RecentActivityPlaceholder>
          <StatsPlaceholder></StatsPlaceholder>
        </Col>
      </Row>
      <Row>
        <Col>
          <SuggestionsPlaceholder></SuggestionsPlaceholder>
        </Col>
      </Row>
    </Layout>
  );
}

export default Profile;
