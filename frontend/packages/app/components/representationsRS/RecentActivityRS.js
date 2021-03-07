import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Banner from "../misc/Banner";

import { range } from "lodash";

const RecentActivityRS = ({
  roomName,
  roomImg,
  roomRating,
  roomDescription,
  roomDuration,
  roomMinPlayers,
  roomMaxPlayers,
  completionDate = "Dec 2020",
  commentaryText = "It was ok...",
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.roomImgWrapper}>
        <Image
          source={{ uri: "http://178.62.72.241" + roomImg }}
          style={styles.roomImg}
        />
        <View style={styles.imgBannerWrapper}>
          <Banner width={40} height={60} color={"goldenrod"}>
            <MaterialCommunityIcons
              name="trophy"
              style={styles.imgBannerIcon}
            />
          </Banner>
        </View>
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
      {commentaryText && (
        <>
          <View style={styles.separator}></View>
          <Text style={styles.commentaryText}>{commentaryText}</Text>
        </>
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

  /* Banner hanging from roomscape image */
  imgBannerWrapper: {
    position: "absolute",
    top: -5,
    right: 20,
  },
  imgBannerIcon: {
    fontSize: 32,
    color: "black",
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
  commentaryText: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
