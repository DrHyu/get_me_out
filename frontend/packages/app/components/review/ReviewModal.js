import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

import BasicModal from "../misc/BasicModal";
import StarRating from "../ratings/StarRating";
import { OnlyTextButton } from "../misc/buttons/Buttons";
import { HSeparator } from "../style-snipets";

const ReviewModal = ({ isOpen = false, onRequestClose }) => {
  const [curentRating, setCurentRating] = useState(5);

  return (
    <BasicModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      containerStyle={styles.container}
      backgroundColor={"#00000080"}
    >
      <Text style={[styles.row, styles.title]}>Review</Text>
      <View style={[HSeparator, { borderBottomColor: "#efefef" }]} />
      <Text style={[styles.row, styles.subTitle]}>Give Stars</Text>
      <View style={[styles.row, styles.starsWrapper]}>
        <StarRating
          isDynamic={true}
          rating={curentRating}
          ratingChangedCallback={(newRating) => setCurentRating(newRating)}
          starSize={48}
          emptyColor={"#efefef"}
        />
      </View>
      <Text style={[styles.row, styles.subTitle]}>Review (No Spoilers)</Text>
      <View style={[styles.row, styles.textInputWrapper]}>
        <TextInput style={styles.textInput} multiline={true} />
      </View>
      <View style={[HSeparator, { borderBottomColor: "#efefef" }]} />
      <View
        style={[
          styles.row,
          {
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 8,
          },
        ]}
      >
        <OnlyTextButton text={"Finish"} onPress={onRequestClose} />
      </View>
    </BasicModal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: "white",
    width: "95%",
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    paddingTop: 16,
  },
  subTitle: {
    fontSize: 24,
    paddingBottom: 8,
    paddingTop: 8,
  },
  starsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWrapper: {
    height: 100,
    marginBottom: 16,
  },
  textInput: {
    fontSize: 16,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    flex: 1,
    textAlignVertical: "top",
  },
});
