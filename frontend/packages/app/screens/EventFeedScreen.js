import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FilterRoomScapes from "../components/roomFilter/FilterRoomScapes";

import MixedFlatList from "../components/misc/MixedFlatList";
import Friendlist from "../components/friends/Friendlist";
import FriendsActivity from "../components/friends/FriendsActivity";

import GenericSearchBar from "../components/searchBar/GenericSearchBar";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Animated from "react-native-reanimated";

const Tab = createMaterialTopTabNavigator();

const EventFeedScreen = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        // paddingTop: 30,
        backgroundColor: "white",
      }}
    >
      <GenericSearchBar />
      <Tab.Navigator>
        <Tab.Screen name="Activity" component={FriendsActivity} />
        <Tab.Screen name="Friends" component={FriendsActivity} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default EventFeedScreen;
