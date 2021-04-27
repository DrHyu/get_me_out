import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { fetchGameRoomByIdQuery } from "@getmeout/common";

import RoomStatsCard from "../components/representationsRS/RoomStatsCard";
import Bar5StarRater from "../components/ratings/Bar5StarRater";

import ReviewModal from "../components/review/ReviewModal";

import {
  GoToRSWebButton,
  ReviewRSButton,
  BookmarkRSButton,
  ShareRSButton,
} from "../components/misc/buttons/Buttons";

import ReviewCard from "../components/review/ReviewCard";

const RoomEscapeScreen = ({ roomId }) => {
  const { data, error, loading } = useQuery(fetchGameRoomByIdQuery);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  console.log(isReviewOpen);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loading && !error && data && (
        <>
          <View style={[styles.row, { paddingHorizontal: 0 }]}>
            <Image
              source={{
                uri:
                  "http://178.62.72.241" + data.gameRooms.edges[0].node.roomImg,
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.titleStyle}>
                {data.gameRooms.edges[0].node.roomName}
              </Text>
              <Text style={styles.descriptionStyle}>
                {data.gameRooms.edges[0].node.roomDescription}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <RoomStatsCard {...data.gameRooms.edges[0].node} />
          </View>
          <View style={styles.row}>
            <GoToRSWebButton />
            <ReviewRSButton onPress={() => setIsReviewOpen(true)} />
            <BookmarkRSButton />
            <ShareRSButton />
          </View>
          <View style={[styles.row, { paddingHorizontal: 20 }]}>
            <Bar5StarRater />
          </View>
          <View style={[styles.row]}>
            <ReviewCard likes={2} highlightColor={"red"} />
          </View>
          <View style={[styles.row]}>
            <ReviewCard highlightColor={"yellow"} />
          </View>
          <View style={[styles.row]}>
            <ReviewCard highlightColor={"goldenrod"} important />
          </View>
          <View style={[styles.row]}>
            <ReviewCard />
          </View>

          <ReviewModal
            isOpen={isReviewOpen}
            onRequestClose={() => setIsReviewOpen(false)}
          />
        </>
      )}
    </ScrollView>
  );
};

export default RoomEscapeScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 100,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "red",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  img: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  titleStyle: {
    fontSize: 20,
  },
  descriptionStyle: {
    fontSize: 12,
  },
});
