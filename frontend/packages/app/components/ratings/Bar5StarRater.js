import React from "react";
import { StyleSheet, Text, View } from "react-native";

import StarRating from "./StarRating";

const Bar5StarRater = ({ average = 4.7, ratings = [2, 4, 0, 1, 23] }) => {
  const maxRating = Math.max(...ratings);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.scoreText}>{average}</Text>
        <StarRating rating={average} />
        <Text style={styles.countRatingsText}>
          {"(" + ratings.reduce((a, b) => a + b, 0) + ")"}
        </Text>
      </View>
      <View style={styles.ratingLinesWrapper}>
        {ratings.map((rating, idx) => (
          <View key={idx} style={styles.ratingLineBG}>
            <View
              style={[
                styles.ratingLineFG,
                rating === 0 ? { borderWidth: 0 } : {},
                { right: `${100 - (100 * rating) / maxRating}%` },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Bar5StarRater;

const RATING_BAR_HEIGHT = 4;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  row: {},
  ratingLinesWrapper: {
    flex: 1,
    justifyContent: "space-around",
    paddingLeft: "5%",
  },
  scoreText: {
    fontSize: 64,
    fontWeight: "bold",
  },
  countRatingsText: {
    fontSize: 16,
    textAlign: "center",
  },
  ratingLineBG: {
    position: "relative",
    borderRadius: 100,
    borderColor: "#404040",
    borderBottomWidth: RATING_BAR_HEIGHT,
  },
  ratingLineFG: {
    borderRadius: 100,
    position: "absolute",
    borderColor: "#FFE600",
    borderBottomWidth: RATING_BAR_HEIGHT,
    top: 0,
    left: 0,
  },
});
