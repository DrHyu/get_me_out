import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import MinifiedRoomScape from "../components/minifiedRoomScape/MinifiedRoomScape";

export default function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);
  console.log(data);
  if (loading) {
    return <Text style={{ paddingTop: 50 }}>Loading ....</Text>;
    // return (
    //   <View style={styles.root}>
    //     <View style={styles.container}>
    //       <Text>HomeScreen</Text>
    //       <MinifiedRoomScape
    //         roomName={"Melon RoomScape"}
    //         roomImage={"media/room_646.jpg"}
    //         roomRating={3.5}
    //         roomMinPlayers={1}
    //         roomMaxPlayers={2}
    //         roomDescription={"Lorem"}
    //         roomDuration={"60-90"}
    //       />
    //     </View>
    //   </View>
    // );
  } else if (!error) {
    return (
      <ScrollView>
        {data.gameRooms.edges.map(({ node }) => (
          <MinifiedRoomScape
            {...node}
            roomDuration={"60"}
            roomRating={node.roomRating / 2}
            key={node.roomId}
          />
        ))}
      </ScrollView>
    );
  } else {
    return <Text style={{ paddingTop: 50 }}>Error ....</Text>;
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  root: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "column",
  },
});
