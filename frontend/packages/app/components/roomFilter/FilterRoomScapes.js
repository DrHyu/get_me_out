import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { gameRoomSearch, FILTER_PARAMS } from "@getmeout/common";
import Slider from "@react-native-community/slider";

const FilterRoomScapes = () => {
  const [filters, setfilters] = useState({
    [FILTER_PARAMS.MIN_RATING]: 1,
    [FILTER_PARAMS.MAX_RATING]: 10,
  });
  const { data, loading } = useQuery(gameRoomSearch, { variables: filters });

  const filterUpdatedCallback = (updates) => {
    console.log(updates);
    console.log(filters);
    setfilters({ ...filters, ...updates });
  };

  return (
    <View style={styles.container}>
      <Text>Min Rating: {filters[FILTER_PARAMS.MIN_RATING]}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={
          filters[FILTER_PARAMS.MIN_RATING]
        } /* Initial value only, NOT a controlled component */
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        /*onValueChange*/ onSlidingComplete={(value) => {
          filterUpdatedCallback({ [FILTER_PARAMS.MIN_RATING]: value });
        }}
      />
      <Text>Max Rating: {filters[FILTER_PARAMS.MAX_RATING]}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={
          filters[FILTER_PARAMS.MAX_RATING]
        } /* Initial value only, NOT a controlled component */
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        /*onValueChange*/ onSlidingComplete={(value) => {
          filterUpdatedCallback({ [FILTER_PARAMS.MAX_RATING]: value });
        }}
      />
      <ScrollView>
        {loading && <Text>Loading ....</Text>}
        {!loading &&
          data &&
          data.gameRoomSearch?.map((room, idx) => {
            return <Text key={idx}>{room.roomName} </Text>;
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50,
  },
});

export default FilterRoomScapes;
