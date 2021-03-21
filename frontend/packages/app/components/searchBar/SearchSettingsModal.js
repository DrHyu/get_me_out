import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const categories = ["Adventure", "Fantasy", "Role-play", "Terror", "Movies"];
const defaultStarRating = 1;
const defaultMaxDistance = 1;
const defaultCategotiesIncluded = categories.map(() => false);
const defaultIncludeCompleted = false;

const SearchSettingsModal = ({ closeFn }) => {
  const [minStarRating, setMinStarRating] = useState(defaultStarRating);
  const [maxDistance, setMaxDistance] = useState(defaultMaxDistance);
  const [categotiesIncluded, setCategotiesIncluded] = useState(
    defaultCategotiesIncluded
  );
  const [includeCompleted, setIncludeCompleted] = useState(
    defaultIncludeCompleted
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.outerRegion} onPress={closeFn} />
      <View style={styles.innerRegion}>
        <View style={styles.row}>
          <Text style={styles.title}>Filters</Text>
          <Pressable onPress={closeFn} style={styles.closeBtn}>
            <MaterialCommunityIcons name="close-circle-outline" size={40} />
          </Pressable>
        </View>
        <View style={styles.hSeparator} />
        <View style={styles.row}>
          <Text style={[styles.filterText, { flexBasis: "100%" }]}>
            At least {minStarRating} ☆
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={0.1}
            value={minStarRating}
            minimumTrackTintColor="#FA7921"
            maximumTrackTintColor="#e55934"
            onValueChange={(value) => setMinStarRating(value.toFixed(1))}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.filterText, { flexBasis: "100%" }]}>
            Maximum {maxDistance} KM
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={500}
            value={maxDistance}
            step={5}
            minimumTrackTintColor="#FA7921"
            maximumTrackTintColor="#e55934"
            onValueChange={(value) => setMaxDistance(value.toFixed(0))}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.filterText, { flexBasis: "100%" }]}>
            Categories:
          </Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, idx) => (
              <Pressable
                key={category}
                onPress={() =>
                  setCategotiesIncluded(
                    categotiesIncluded.map((state, i) =>
                      idx === i ? !state : state
                    )
                  )
                }
              >
                <Text
                  style={[
                    styles.category,
                    categotiesIncluded[idx] ? styles.categoryPressed : {},
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.filterText, { flex: 1 }]}>Show completed </Text>
          <Pressable onPress={() => setIncludeCompleted(!includeCompleted)}>
            {includeCompleted && (
              <MaterialCommunityIcons name="check-circle-outline" size={40} />
            )}
            {!includeCompleted && (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={40}
              />
            )}
          </Pressable>
        </View>
        {/* Pushes it all down */}
        <View style={{ flex: 1 }} />
        <View style={styles.hSeparator} />

        <View
          style={[
            styles.row,
            { justifyContent: "space-evenly" },
            { marginBottom: 0 },
          ]}
        >
          <Button
            title={"Reset"}
            onPress={() => {
              setMinStarRating(defaultStarRating);
              setMaxDistance(defaultMaxDistance);
              setCategotiesIncluded(defaultCategotiesIncluded);
              setIncludeCompleted(defaultIncludeCompleted);
            }}
          />
          <Button title={"Filter"} onPress={closeFn} />
        </View>
        <View style={styles.row}></View>
      </View>
    </View>
  );
};

export default SearchSettingsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000080",

    justifyContent: "flex-start",
    alignItems: "center",
  },
  outerRegion: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    elevation: 0,
  },
  innerRegion: {
    height: "80%",
    width: windowWidth - 16 * 2,
    backgroundColor: "white",
    borderRadius: 32,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "column",
    paddingVertical: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 16,
    fontSize: 32,
  },
  row: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
  },
  hSeparator: {
    width: windowWidth,
    height: 1,
    borderTopWidth: 0.5,
    marginTop: 8,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 24,
  },
  categoriesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  category: {
    backgroundColor: "#5bc0eb",
    borderRadius: 24,
    overflow: "hidden",

    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  categoryPressed: {
    backgroundColor: "#9bc53d",
    color: "white",
  },
});
