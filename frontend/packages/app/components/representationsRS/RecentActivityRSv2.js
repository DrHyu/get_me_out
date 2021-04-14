import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { row, HSeparator } from "../style-snipets";
import Avatar from "../misc/Avatar";
import DateCard from "../misc/DateCard";
import StarRating from "../ratings/StarRating";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const RecentActivityRSv2 = ({
  highlightColor = null,
  roomName,
  roomImg,
  roomRating,
  completionDate = "Dec 2020",
  commentaryText = "It was ok...",
}) => {
  return (
    <View
      style={[
        styles.container,
        highlightColor === null
          ? { borderColor: "black", borderWidth: 2 }
          : { borderColor: highlightColor, borderWidth: 3 },
      ]}
    >
      <View>
        <Avatar />
        <DateCard style={{ marginTop: 4 }} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: "flex-start",
              paddingHorizontal: 0,
              marginBottom: 2,
            },
          ]}
        >
          <Text style={styles.reviewerName}>Pepito de los</Text>
          <StarRating rating={roomRating} starSize={20} />
        </View>
        {commentaryText && (
          <>
            <View
              style={[
                HSeparator,
                { borderBottomColor: "#808080", marginBottom: 4 },
              ]}
            />
            <Text style={[styles.reviewText, { flex: 1 }]}>
              This scaperoom changed my life
            </Text>
          </>
        )}
        <View style={styles.roomImgWrapper}>
          <Image
            source={{ uri: "http://178.62.72.241" + roomImg }}
            style={styles.roomImg}
          />
          <View style={styles.roomNameOverlay}>
            <Text style={styles.roomName}>{roomName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentActivityRSv2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "yellow",
    borderWidth: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  reviewerName: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  reviewText: {
    fontSize: 12,
    marginBottom: 10,
  },
  reactionsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  roomImgWrapper: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 120,
  },
  roomImg: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  roomNameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000080",
  },
  roomName: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
});
