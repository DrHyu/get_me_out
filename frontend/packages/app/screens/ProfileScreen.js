import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import MixedFlatList from "../components/misc/MixedFlatList";
import useFavourites from "../components/profile/Favourites";
import useRecentActivity from "../components/profile/RecentActivityHook";
import useHeader from "../components/profile/Header";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params;

  const {
    headerData: RAHeaderData,
    itemData: RAItemData,
    renderHeader: RARenderHeader,
    renderItem: RARenderItem,
  } = useRecentActivity(userId);

  const { favouritesData, renderFavourites } = useFavourites(userId);

  const { renderProfileHeader } = useHeader(userId);

  const structure = [
    {
      data: {},
      renderFunc: renderProfileHeader,
      isSticky: true,
      key: "header0",
    },
    {
      data: favouritesData,
      renderFunc: renderFavourites,
      isSticky: true,
      key: "favourites",
    },
    {
      data: RAHeaderData,
      renderFunc: RARenderHeader,
      isSticky: true,
      key: "header2",
    },
    ...RAItemData.map((node) => ({
      data: node,
      renderFunc: RARenderItem,
      isSticky: false,
      key: `${node.gameroom.roomId}`,
    })),
  ];

  return (
    <View style={{ paddingTop: 30, backgroundColor: "#E7E7E7" }}>
      <MixedFlatList data={structure} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
