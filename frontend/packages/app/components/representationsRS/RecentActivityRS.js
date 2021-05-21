import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Banner from "../misc/Banner";

import { range } from "lodash";

const RecentActivityRS = ({
  roomName,
  roomImg,
  roomRating,
  completionDate = "Dec 2020",
  reviewText,
  withButtons = false,
  decoration,
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.roomImgWrapper}>
        <Image
          source={{ uri: "http://178.62.72.241" + roomImg }}
          style={styles.roomImg}
        />
        {decoration && (
          <View style={styles.decorationWrapper}>{decoration}</View>
        )}
      </View>

      <View style={styles.statsBar}>
        <View style={styles.completionDateGroup}>
          <Text style={styles.completionDate}>{completionDate}</Text>
          <MaterialCommunityIcons
            name="calendar-range"
            style={styles.completionDateIcon}
          />
        </View>
        <View style={styles.starRating}>
          {range(0, 5, 1).map((idx) => (
            <View style={{}} key={idx}>
              <MaterialCommunityIcons
                name="star-half"
                style={{
                  ...styles.starRatingIcon,
                  /* Round up to the next .5 */
                  color: roomRating - (idx + 0.5) >= -0.25 ? "gold" : "white",
                }}
              />
              <MaterialCommunityIcons
                name="star-half"
                style={{
                  ...styles.starRatingIcon,
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
      {reviewText && (
        <>
          <View style={styles.separator}></View>
          <Text style={styles.reviewText}>{reviewText}</Text>
        </>
      )}
      {withButtons && (
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
              console.log("Pressed");
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
      )}
    </View>
  );
};

export default RecentActivityRS;

const starIconSize = 18;

const styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: 8,
    marginVertical: 12,
    borderColor: "#061b30",

    borderWidth: 1,
    borderRadius: 4,
    // overflow: "hidden",

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

  decorationWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  /* Wrapper arround all the stats of the room */
  statsBar: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#061b30",
    flexDirection: "row",
  },

  /* Completion date text + icon */
  completionDateGroup: {
    flex: 1,
    flexDirection: "row",
  },
  completionDate: {
    color: "white",
    fontSize: starIconSize - 4,
  },
  completionDateIcon: {
    color: "white",
    fontSize: starIconSize,
    marginHorizontal: starIconSize / 4,
  },

  /* Roomscape image */
  roomImgWrapper: {
    width: "100%",
    height: 80,
  },
  roomImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* Group of number/text + icon */
  starRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  starRatingIcon: {
    fontSize: starIconSize,
  },

  separator: {
    alignSelf: "center",
    width: "95%",
    borderColor: "black",
    borderBottomWidth: 0.5,
  },

  /* Title of the roomscape */
  title: {
    marginVertical: 4,
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewText: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
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
  },
});
