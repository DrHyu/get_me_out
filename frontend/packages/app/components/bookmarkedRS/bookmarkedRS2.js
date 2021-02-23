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
import SwipeableItem, { UnderlayParams } from "react-native-swipeable-item";
import DraggableFlatList from "react-native-draggable-flatlist";
const { multiply, sub } = Animated;

import { useQuery } from "@apollo/react-hooks";
import { recomendedRoomsQuery } from "@getmeout/common";
import Bookmark from "../representationsRS/SuperMinifiedRS";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OVERSWIPE_DIST = 20;

const Bookmarks = () => {
  const { data: bookmarks, loading, error } = useQuery(recomendedRoomsQuery);

  const [data, setdata] = useState([]);

  useEffect(() => {
    if (!loading && !error && bookmarks) {
      setdata(bookmarks.gameRooms.edges.map(({ node }) => node).slice(0, 10));
    }
  }, [loading, bookmarks, error]);

  // const itemRefs = new Map();

  const deleteItem = (item) => {
    const updatedData = data.filter((d) => d !== item);
    // Animate list to close gap when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setdata(updatedData);
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
    <View style={[styles.row, styles.underlayRight]}>
      <Animated.View
        style={[
          {
            opacity: percentOpen,
            transform: [{ translateX: multiply(sub(1, percentOpen), -100) }], // Translate from left on open
          },
        ]}
      >
        <TouchableOpacity onPressOut={close}>
          <Text style={[styles.text]}>CLOSE</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <SwipeableItem
        key={"" + item.roomId}
        item={item}
        // ref={(ref) => {
        //   if (ref && !itemRefs.get(item.key)) {
        //     itemRefs.set(item.key, ref);
        //   }
        // }}
        // onChange={({ open }) => {
        //   if (open) {
        //     // Close all other open items
        //     [...itemRefs.entries()].forEach(([key, ref]) => {
        //       if (key !== item.key && ref) ref.close();
        //     });
        //   }
        // }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={renderUnderlayLeft}
        renderUnderlayRight={renderUnderlayRight}
        snapPointsLeft={[150]}
        snapPointsRight={[175]}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 4,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
          onLongPress={drag}
        >
          <Bookmark {...item} order={index} />
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
        onDragEnd={({ data }) => setdata(data)}
        activationDistance={20}
      />
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
