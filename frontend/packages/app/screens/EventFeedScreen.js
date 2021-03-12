import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FilterRoomScapes from "../components/roomFilter/FilterRoomScapes";

import MixedFlatList from "../components/misc/MixedFlatList";
import Friendlist from "../components/friends/Friendlist";
import FriendsActivity, {
  useFriendsActivity,
} from "../components/friends/FriendsActivity";

const EventFeedScreen = () => {
  const { data, renderFriendActivityItem } = useFriendsActivity();

  console.log(data);
  const structure = [
    {
      renderFunc: () => (
        <View style={{ height: 100, backgroundColor: "#1E272C" }} />
      ),
    },
    {
      renderFunc: () => <Friendlist />,
      key: "friendlist",
    },
    {
      renderFunc: () => (
        <Text
          style={{
            fontSize: 24,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "#f3f3f3",
          }}
        >
          Friends Activity
        </Text>
      ),
      isSticky: true,
      key: `header0`,
    },
    ...data.map((node) => ({
      data: node,
      renderFunc: renderFriendActivityItem,
      isSticky: false,
      key: `${node.roomId}`,
    })),
  ];

  return (
    <View style={{ paddingTop: 30 }}>
      <MixedFlatList data={structure} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#1E272C",
  },
  background: {
    height: "20%",
    backgroundColor: "#1E272C",
  },
});
export default EventFeedScreen;
