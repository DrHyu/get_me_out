import React from "react";
import { StyleSheet, Pressable, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { range } from "lodash";

const StarRating = ({
  rating,
  maxRating = 5,
  starSize = 20,
  fillColor = "gold",
  emptyColor = "white",
  ratingChangedCallback = null,
}) => {
  return (
    <View style={styles.statsGroup}>
      {range(0, maxRating, 1).map((idx) => (
        <View key={idx}>
          <MaterialCommunityIcons
            name="star-half"
            style={{
              ...styles.statsGroupIcon,
              /* Round up to the next .5 */
              color: rating - (idx + 0.5) >= -0.25 ? fillColor : emptyColor,
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
              color: rating - (idx + 1) >= -0.25 ? fillColor : emptyColor,
              transform: [{ rotateY: "180deg" }],
            }}
            size={starSize}
          />
          {ratingChangedCallback && (
            <>
              <Pressable
                style={[
                  styles.pressableOverlays,
                  { left: 0, right: starSize / 2 },
                ]}
                onPress={() => ratingChangedCallback(idx + 0.5)}
              />
              <Pressable
                style={[
                  styles.pressableOverlays,
                  { left: starSize / 2, right: 0 },
                ]}
                onPress={() => ratingChangedCallback(idx + 1)}
              />
            </>
          )}
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
  pressableOverlays: {
    position: "absolute",
    top: 0,
    bottom: 0,
    elevation: 1,
    zIndex: 1,
  },
});
