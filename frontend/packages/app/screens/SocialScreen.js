import React from "react";

import Layout from "../components/layout/Layout";
import Friendlist from "../components/friends/FriendListv2";
import FriendsActivity from "../components/friends/FriendsActivity";
import GenericSearchBar from "../components/searchBar/GenericSearchBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const EventFeedScreen = () => {
  return (
    <Layout>
      <GenericSearchBar />
      <Tab.Navigator>
        <Tab.Screen name="Activity" component={FriendsActivity} />
        <Tab.Screen name="Friends" component={Friendlist} />
      </Tab.Navigator>
    </Layout>
  );
};

export default EventFeedScreen;
