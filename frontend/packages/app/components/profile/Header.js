import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import TempUsrImg from "../../assets/user-profile-dummy.jpg";

const useHeader = () => {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  const [loadedData, setloadedData] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setloadedData(data.gameRooms.edges.slice(0, 3).map(({ node }) => node));
    }
  }, [data, loading, error]);

  const renderProfileHeader = () => (
    <View style={styles.container}>
      <View style={styles.hiddenBlueBgForEdges}>
        <View style={styles.upperWhiteLayer}>
          <View style={styles.profileImgWrapper}>
            <Image source={TempUsrImg} style={styles.profileImg} />
          </View>
          <Text style={styles.userName}>Bob the Fisher</Text>
        </View>
      </View>
      <View style={styles.shadowContainer}>
        <View style={styles.bottomBlueLayer}>
          <View style={styles.statsContainer}>
            <View style={styles.statsGroup}>
              <Text style={styles.statsNumber}>10</Text>
              <Text style={styles.statsField}>Reviews</Text>
            </View>
            <View style={[styles.statsGroup, styles.oddStatsGroup]}>
              <Text style={styles.statsNumber}>101</Text>
              <Text style={styles.statsField}>Escaperoms</Text>
            </View>
            <View style={styles.statsGroup}>
              <Text style={styles.statsNumber}>5</Text>
              <Text style={styles.statsField}>Friends</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return { renderProfileHeader };
};

export default useHeader;

const BORDER_RAIDUS = 32;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 2,
    paddingBottom: 10,
    backgroundColor: "#E7E7E7",
  },
  hiddenBlueBgForEdges: {
    backgroundColor: "#6AB8FF",
    marginBottom: -1,
  },
  upperWhiteLayer: {
    width: "100%",

    borderBottomRightRadius: BORDER_RAIDUS,
    borderBottomLeftRadius: BORDER_RAIDUS,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  shadowContainer: {
    overflow: "hidden",
    paddingBottom: 10,
  },
  bottomBlueLayer: {
    backgroundColor: "#6AB8FF",
    borderBottomRightRadius: BORDER_RAIDUS,
    borderBottomLeftRadius: BORDER_RAIDUS,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
  },
  profileImgWrapper: {
    width: 120,
    height: 120,
    overflow: "hidden",
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 6,
    borderColor: "#1A76CB",
  },
  profileImg: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    paddingHorizontal: BORDER_RAIDUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statsGroup: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // paddingTop: 2,
    paddingBottom: 6,
  },
  oddStatsGroup: {
    backgroundColor: "#1A76CB",
    paddingHorizontal: 5,
  },
  statsNumber: {
    fontSize: 24,
    color: "white",
  },
  statsField: {
    fontSize: 16,
    color: "white",
  },
});
