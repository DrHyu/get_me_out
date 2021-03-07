import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecentActivityRS from "../representationsRS/RecentActivityRS";
import { recomendedRoomsQuery } from "@getmeout/common";

const stringSortFunc = (a, b) => ("" + a).localeCompare(b);
const sortCategories = [
  {
    icon: "star-outline",
    defaultSortDescending: true,
    iconEmptySpacePct: 5,
    sortFunc: (a, b, reverse) => (reverse ? !(a < b) : a < b),
  },
  {
    icon: "timer-sand",
    defaultSortDescending: false,
    iconEmptySpacePct: 25,
    sortFunc: (a, b, reverse) => {
      if (reverse) return -1 * stringSortFunc(a.roomName, b.roomName);
      return stringSortFunc(a.roomName, b.roomName);
    },
  },
  {
    icon: "alphabetical",
    defaultSortDescending: false,
    iconEmptySpacePct: 0,
    sortFunc: (a, b, reverse) => {
      if (reverse) return -1 * stringSortFunc(a.roomName, b.roomName);
      return stringSortFunc(a.roomName, b.roomName);
    },
  },
];

const RecentActivity = () => {
  const [sortBy, setSortBy] = useState(0);
  const [sortDescending, setsortDescending] = useState(true);

  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>My Activity</Text>
        <View style={styles.sortButtonsWrapper}>
          {sortCategories.map(({ icon }, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.iconPlusSortDirection,
                {
                  width:
                    sortBy === idx ? sortIconSize * 1.5 : sortIconSize * 1.5,
                },
              ]}
              onPress={() => {
                if (sortBy !== idx) {
                  setSortBy(idx);
                  setsortDescending(sortCategories[idx].defaultSortDescending);
                } else {
                  setsortDescending(!sortDescending);
                }
              }}
            >
              <MaterialCommunityIcons name={icon} style={styles.sortButton} />
              {sortBy === idx && (
                <MaterialCommunityIcons
                  name="menu-down"
                  style={[
                    styles.sortDirectionIcon,
                    {
                      left:
                        sortIconSize /** Space of the previous icon */ -
                        (sortCategories[idx].iconEmptySpacePct / 100) *
                          sortIconSize /** Empty space of the previous icon */ +
                        2 /** Arbitrary spacing*/ -
                        sortIconSize * 0.3 /** Empry space in arrow icon */,
                    },
                    sortDescending
                      ? {}
                      : { transform: [{ rotateX: "180deg" }] },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.activitiesList}>
        {!loading &&
          !error &&
          data.gameRooms.edges
            .slice(0, 4)
            .map(({ node }) => node) /* Unpack */
            .sort((a, b) =>
              sortCategories[sortBy].sortFunc(a, b, sortDescending)
            ) /* Is sort ok in react ? Think not ... TODO*/
            .map((node) => {
              console.log(node.roomName);
              return (
                <RecentActivityRS
                  {...node}
                  roomDuration={"60"}
                  roomRating={node.roomRating / 2}
                  key={node.roomId}
                />
              );
            })}
      </ScrollView>
    </View>
  );
};

export default RecentActivity;

const sortIconSize = 32;
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerWrapper: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 24,
    alignSelf: "center",
  },
  sortButtonsWrapper: {
    flexDirection: "row",
  },
  iconPlusSortDirection: {
    flexDirection: "row",
  },
  sortButton: {
    fontSize: sortIconSize,
  },
  sortDirectionIcon: {
    fontSize: sortIconSize,
    position: "absolute",
  },
  activitiesList: {
    flex: 1,
  },
});
