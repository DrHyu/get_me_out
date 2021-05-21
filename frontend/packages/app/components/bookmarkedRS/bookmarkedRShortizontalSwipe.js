import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from "react-native";
import Animated from "react-native-reanimated";
import SwipeableItem, { OpenDirection } from "react-native-swipeable-item";
import DraggableFlatList from "react-native-draggable-flatlist";
const { multiply, sub, max } = Animated;

import { useQuery } from "@apollo/react-hooks";
import { recomendedRoomsQuery } from "@getmeout/common";
import Bookmark from "../representationsRS/SuperMinifiedRS";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OVERSWIPE_DIST = 20;

const Bookmarks = ({ navigation, ListHeaderComponent }) => {
  const { data: bookmarks, loading, error } = useQuery(recomendedRoomsQuery);

  const [data, setData] = useState([]);

  console.log(data.map((d) => d.roomName));

  useEffect(() => {
    if (!loading && !error && bookmarks) {
      setData(
        bookmarks.gameRooms.edges
          .map(({ node }, idx) => ({ ...node, ranking: idx }))
          .slice(0, 10)
      );
    }
  }, [loading, bookmarks, error]);

  const deleteItem = (item) => {
    const updatedData = data.filter((d) => d !== item);
    // Animate list to close gap when item is deleted
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setData(updatedData);
  };

  const renderUnderlayLeft = ({ item, percentOpen }) => (
    <Animated.View
      style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
    >
      <TouchableOpacity onPressOut={() => deleteItem(item)}>
        <Text style={styles.text}>{`[x]`}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderUnderlayRight = ({ item, percentOpen, open, close }) => (
    <Animated.View
      style={[
        styles.row,
        styles.underlayRight,
        {
          opacity: percentOpen,
          transform: [
            {
              translateX: multiply(sub(1, percentOpen), -100),
            },
          ], // Translate from left on open
        },
      ]}
    >
      <TouchableOpacity onPressOut={close}>
        <Text style={[styles.text]}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <SwipeableItem
        key={"" + item.roomId}
        item={item}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={renderUnderlayLeft}
        renderUnderlayRight={renderUnderlayRight}
        snapPointsLeft={[150]}
        snapPointsRight={[175]}
        onChange={({ open, snapPoint }) => {
          if (open === OpenDirection.RIGHT) {
            navigation.navigate("RoomEscapeScreen");
          }
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 4,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fefefe",
          }}
          onLongPress={drag}
          onPress={() => {
            navigation.navigate("RoomEscapeScreen");
          }}
        >
          <Bookmark {...item} order={item.ranking} />
        </TouchableOpacity>
      </SwipeableItem>
    );
  }, []);

  return (
    <View style={styles.container}>
      <DraggableFlatList
        scrollEnabled={true}
        keyExtractor={(item) => "" + item.roomId}
        data={data}
        renderItem={renderItem}
        onDragEnd={({ data }) =>
          setData(data.map((item, idx) => ({ ...item, ranking: idx })))
        }
        activationDistance={20}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
