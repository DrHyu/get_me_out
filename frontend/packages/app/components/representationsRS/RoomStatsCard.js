import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

import { range } from "lodash";

const RoomStatsCard = ({
  roomName,
  roomImg,
  roomRating,
  roomDescription,
  roomDuration,
  roomMinPlayers,
  roomMaxPlayers,
  navigation,
}) => {
  const categoryTags = [
    "Terror",
    "Funny",
    "Bondage",
    "Gay porn",
    "Terror",
    "Funny",
    "Bondage",
    "Lesbian porn",
  ];

  return (
    <View style={styles.conatiner}>
      <View style={styles.row}>
        <View style={[styles.metricContainer]}>
          <Text style={styles.metricItemText}>3</Text>
          <MaterialCommunityIcons
            name="account-group"
            style={styles.metricItemIcon}
          />
          <View style={styles.metricSeparator} />
        </View>

        <View style={[styles.metricContainer]}>
          <Text style={styles.metricItemText}>60 min</Text>
          <MaterialCommunityIcons
            name="clock-time-eight-outline"
            style={styles.metricItemIcon}
          />
          <View style={styles.metricSeparator} />
        </View>
        <View style={[styles.metricContainer]}>
          <Text style={styles.metricItemText}>Hard</Text>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            style={styles.metricItemIcon}
          />
          <View style={styles.metricSeparator} />
        </View>
        <View style={[styles.metricContainer, styles.metricContainerLastChild]}>
          <Text style={styles.metricItemText}>50-60</Text>
          <FontAwesome name="euro" style={styles.metricItemIcon} />
        </View>
      </View>
      <View style={[styles.row, styles.categoryItemsContainer]}>
        {categoryTags.map((categoryTag, idx) => (
          <View key={idx} style={styles.categoryItem}>
            <Text>{categoryTag}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.row, styles.rowLastChild]}>
        <Text style={styles.addressText}>Barcelona C/Girona, 27</Text>
        <Foundation name="map" style={styles.addressIcon} />
      </View>
    </View>
  );
};

export default RoomStatsCard;

const smallTextSize = 18;

const FONT_SIZE = 16;
const ROW_V_PADDING = 4;
const BG_COLOR = "#303030";

const styles = StyleSheet.create({
  conatiner: {
    width: "100%",
    backgroundColor: BG_COLOR,

    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: ROW_V_PADDING,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
  },
  rowLastChild: {
    borderBottomWidth: 0,
  },
  metricContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 16,
    position: "relative",
  },
  metricContainerLastChild: {
    borderRightWidth: 0,
  },
  metricItemText: {
    color: "white",
    fontSize: FONT_SIZE,
  },
  metricItemIcon: {
    color: "white",
    fontSize: 2 * FONT_SIZE,
  },
  metricSeparator: {
    position: "absolute",
    top: 0,
    bottom: -ROW_V_PADDING,
    right: 0,
    width: 0,
    borderRightWidth: 1,
    borderColor: "white",
  },
  categoryItemsContainer: {
    justifyContent: "center",
    alignContent: "space-between",
    flexWrap: "wrap",
  },
  categoryItem: {
    backgroundColor: "white",
    paddingHorizontal: 4,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  addressText: {
    color: "white",
    paddingRight: FONT_SIZE,
    fontSize: FONT_SIZE,
  },
  addressIcon: {
    color: "white",
    fontSize: FONT_SIZE * 2,
  },
});
