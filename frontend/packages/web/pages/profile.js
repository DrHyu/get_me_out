import React, { useState } from "react";

import Layout from "../src/components/layout/Layout";

import ProfileTab from "../src/components/profile/profile_tab";
import BadgesTab from "../src/components/profile/badges_tab";
import RoutesTab from "../src/components/profile/routes_tab";

import AuthRequired from "../src/components/shared/AuthRequired";

import { Row, Col, Tabs, Tab } from "react-bootstrap";

import styled from "styled-components";

const SuggestionsPlaceholder = styled.div`
  height: 300px;
  background-color: royalblue;
  margin-bottom: 10px;
  margin-top: 10px;
`;

function Profile() {
  const [key, setKey] = useState("profile");

  return (
    <AuthRequired>
      <Layout>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="profile" title="Profile">
            <ProfileTab />
          </Tab>
          <Tab eventKey="badges" title="Badges">
            <BadgesTab />
          </Tab>
          <Tab eventKey="routes" title="Routes">
            <RoutesTab />
          </Tab>
        </Tabs>
      </Layout>
    </AuthRequired>
  );
}

export default Profile;
