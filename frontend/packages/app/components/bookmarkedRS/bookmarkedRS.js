import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import Bookmark from "../representationsRS/SuperMinifiedRS";

import React, { useState, useCallback, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

export default function BookmarkedRS({ navigation, ListHeaderComponent }) {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log("loaded");
      setElements(data.gameRooms.edges.map(({ node }) => node).slice(0, 10));
    }
  }, [loading, data, error]);

  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          // height: 100,
          marginHorizontal: 4,
          backgroundColor: isActive ? "#3F8EBF" : item.backgroundColor,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        onLongPress={drag}
        onPlaceholderIndexChange
      >
        <Bookmark {...item} order={index} />
      </TouchableOpacity>
    );
  }, []);

  // if (loading) {
  //   return <Text style={{ paddingTop: 50 }}>Loading ....</Text>;
  // } else if (!error) {
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={elements}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.roomId}`}
        onDragEnd={({ data }) => setElements(data)}
        ListHeaderComponent={ListHeaderComponent}
        onPlaceholderIndexChange={(idx) => console.log(idx)}
      />
    </View>
    // <>
    //   {data.gameRooms.edges.map(({ node }, idx) => (
    //     <Bookmark
    //       {...node}
    //       roomDuration={"60"}
    //       roomRating={node.roomRating / 2}
    //       key={node.roomId}
    //       order={idx}
    //     />
    //   ))}
    // </>
  );
  // } else {
  //   return <Text style={{ paddingTop: 50 }}>Error ....</Text>;
  // }
}
