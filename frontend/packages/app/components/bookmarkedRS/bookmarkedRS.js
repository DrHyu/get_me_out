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
          marginHorizontal: 4,
          backgroundColor: isActive ? "#3F8EBF" : item.backgroundColor,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        onLongPress={drag}
      >
        <Bookmark {...item} order={index} />
      </TouchableOpacity>
    );
  }, []);

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
  );
}
