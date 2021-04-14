import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { range } from "lodash";

const MinifiedRoomScape = ({
  roomName,
  roomImg,
  roomRating,
  roomDescription,
  roomDuration,
  roomMinPlayers,
  roomMaxPlayers,
  navigation,
}) => {
  return (
    <View style={styles.conatiner}>
      <Image
        source={{ uri: "http://178.62.72.241" + roomImg }}
        style={styles.img}
      />
      <View style={styles.statsBar}>
        <View style={styles.statsGroup}>
          <Text
            style={styles.statsGroupText}
          >{`${roomMinPlayers}-${roomMaxPlayers}`}</Text>
          <MaterialCommunityIcons
            name="account-multiple"
            style={styles.statsGroupIcon}
          />
        </View>
        <View style={styles.statsGroup}>
          <Text style={styles.statsGroupText}>{roomDuration}</Text>
          <MaterialCommunityIcons
            name="clock-outline"
            style={styles.statsGroupIcon}
          />
        </View>
        <View
          style={{
            ...styles.statsGroup,
            position: "absolute",
            right: 0,
            top: "50%",
            transform: [{ translateY: -8 }],
          }}
        >
          {range(0, 5, 1).map((idx) => (
            <View style={{}} key={idx}>
              <MaterialCommunityIcons
                name="star-half"
                style={{
                  ...styles.statsGroupIcon,
                  /* Round up to the next .5 */
                  color: roomRating - (idx + 0.5) >= -0.25 ? "gold" : "white",
                }}
              />
              <MaterialCommunityIcons
                name="star-half"
                style={{
                  ...styles.statsGroupIcon,
                  position: "absolute",
                  /* Move 1 pixel to the left to cover up the seam between the two half stars */
                  left: -1,
                  /* Round up to the next .5 */
                  color: roomRating - (idx + 1) >= -0.25 ? "gold" : "white",
                  transform: [{ rotateY: "180deg" }],
                }}
              />
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.title}>{roomName}</Text>
      <View style={styles.horizontalSeparator} />
      <Text style={styles.description}>{roomDescription}</Text>

      <View style={styles.actionButtonsGrp}>
        <Pressable
          onPress={() => {
            console.log("Pressed");
          }}
          style={({ pressed }) => ({
            ...styles.actionButton,
            backgroundColor: pressed ? "#344ceb" : "#0085FF",
          })}
        >
          {({ pressed }) => (
            <MaterialCommunityIcons
              name="thumbs-up-down"
              style={{
                ...styles.actionButtonIcon,
                color: pressed ? "white" : "white",
              }}
              size={28}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("RoomEscapeScreen");
          }}
          style={({ pressed }) => ({
            ...styles.actionButton,
            backgroundColor: pressed ? "#344ceb" : "#0085FF",
          })}
        >
          {({ pressed }) => (
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                ...styles.actionButtonIcon,
                color: pressed ? "white" : "white",
              }}
              size={32}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default MinifiedRoomScape;

const smallTextSize = 18;

const styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: 8,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  img: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  /* Bar with all the ratings, time, price, difficutly etc... */
  statsBar: {
    paddingTop: 4,
    paddingBottom: 4,

    backgroundColor: "#061b30",

    flex: 0,
    flexDirection: "row",
  },
  /* Group of number/text + icon */
  statsGroup: {
    marginHorizontal: 8,
    paddingHorizontal: 16,

    // backgroundColor: "gray",
    // height: 24,
    // borderRadius: 12 /* 50% */,

    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  statsGroupText: {
    fontSize: smallTextSize,
    marginRight: 4,
    color: "white",
  },
  statsGroupIcon: {
    fontSize: smallTextSize + 6,
    color: "white",
  },
  horizontalSeparator: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginHorizontal: 6,
  },
  /* Title of the roomscape */
  title: {
    marginTop: 4,
    marginHorizontal: 4,
    fontSize: 18,
    fontWeight: "bold",
  },
  /* Roomscape descroption */
  description: {
    fontSize: 10,
    marginHorizontal: 4,
  },
  learnMoreButton: {
    width: 10,
  },
  /* Action buttons  */
  actionButtonsGrp: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    width: 50,
    height: 35,

    marginVertical: 8,
    marginHorizontal: 8,

    borderRadius: 10,
    overflow: "hidden",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
