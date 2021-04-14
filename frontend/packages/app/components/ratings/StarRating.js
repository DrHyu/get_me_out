import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { range } from "lodash";

const StarRating = ({ rating, maxRating = 5, starSize = 20 }) => {
  return (
    <View style={styles.statsGroup}>
      {range(0, maxRating, 1).map((idx) => (
        <View key={idx}>
          <MaterialCommunityIcons
            name="star-half"
            style={{
              ...styles.statsGroupIcon,
              /* Round up to the next .5 */
              color: rating - (idx + 0.5) >= -0.25 ? "gold" : "white",
            }}
            size={starSize}
          />
          <MaterialCommunityIcons
            name="star-half"
            style={{
              ...styles.statsGroupIcon,
              position: "absolute",
              /* Move 1 pixel to the left to cover up the seam between the two half stars */
              left: -1,
              /* Round up to the next .5 */
              color: rating - (idx + 1) >= -0.25 ? "gold" : "white",
              transform: [{ rotateY: "180deg" }],
            }}
            size={starSize}
          />
        </View>
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  statsGroup: {
    flex: 0,
    flexDirection: "row",
  },
  statsGroupIcon: {
    color: "white",
  },
});
