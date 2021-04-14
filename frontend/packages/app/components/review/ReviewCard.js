import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { row, HSeparator } from "../style-snipets";
import Avatar from "../misc/Avatar";
import StarRating from "../ratings/StarRating";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReviewCard = ({
  likes = 0,
  important = false,
  highlightColor = null,
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
          <StarRating rating={4.5} starSize={20} />
        </View>
        <View
          style={[
            HSeparator,
            { borderBottomColor: "#808080", marginBottom: 4 },
          ]}
        />
        <Text style={[styles.reviewText, { flex: 1 }]}>
          This scaperoom changed my life
        </Text>
        <View style={styles.reactionsContainer}>
          {likes > 0 && (
            <View style={styles.reactionsContainer}>
              <View
                style={[styles.reactionWrapper, { backgroundColor: "red" }]}
              >
                <Text style={styles.reactionText}>{likes}</Text>
                <MaterialCommunityIcons
                  name="cards-heart"
                  style={styles.reactionIcon}
                  color="white"
                />
              </View>
            </View>
          )}
          {important && (
            <View style={styles.reactionsContainer}>
              <View
                style={[
                  styles.reactionWrapper,
                  { backgroundColor: "gray", borderRadius: 8 },
                ]}
              >
                <Text style={[styles.reactionText, { paddingHorizontal: 12 }]}>
                  !
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
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
  },
  reactionsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  reactionWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    borderRadius: 4,
    height: 24,
  },
  reactionText: {
    color: "white",
    fontSize: 14,
  },
  reactionIcon: {
    marginLeft: 2,
    fontSize: 20,
  },
});
