import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { allRoomNamesQuery } from "@getmeout/common";

const TestList = () => {
  const { data, loading } = useQuery(allRoomNamesQuery);

  if (loading)
    return (
      <View>
        <Text> Loading !</Text>
      </View>
    );

  return (
    <View>
      {data.gameRooms.edges.map((edge) => {
        console.log(edge);
        return <Text key={edge.node.roomName}>{edge.node.roomName} Hi</Text>;
      })}
      <Text>;lkfgajdf;lkajs;lfkjasld;kfj</Text>
    </View>
  );
};

export default TestList;
