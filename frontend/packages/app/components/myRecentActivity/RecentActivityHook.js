import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecentActivityRS from "../representationsRS/RecentActivityRS";
import { recomendedRoomsQuery } from "@getmeout/common";

import Banner from "../misc/Banner";
import MixedFlatList from "../misc/MixedFlatList";

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

const renderRecentActivityItem = ({ item }) => {
  return (
    <RecentActivityRS
      {...item}
      roomDuration={"60"}
      roomRating={item.roomRating / 2}
      key={item.roomId}
      decoration={
        <Banner width={40} height={60} color={"goldenrod"}>
          <MaterialCommunityIcons name="trophy" size={32} color={"black"} />
        </Banner>
      }
    />
  );
};

const useRecentActivity = () => {
  const [sortBy, setSortBy] = useState(0);
  const [sortDescending, setsortDescending] = useState(true);
  const [sortedData, setsortedData] = useState([]);

  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  const sortData = (data) => {
    return []
      .concat(data)
      .sort((a, b) => sortCategories[sortBy].sortFunc(a, b, sortDescending));
  };

  useEffect(() => {
    if (!loading && !error) {
      const newData = sortData(
        data.gameRooms.edges.slice(0, 6).map(({ node }) => node)
      );
      setsortedData(newData);
    } else {
      setsortedData([]);
    }
  }, [data, loading, error, sortBy, sortDescending]);

  const renderHeaderComponent = () => {
    return (
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
    );
  };

  return {
    headerData: sortCategories,
    itemData: sortedData,
    renderHeader: renderHeaderComponent,
    renderItem: renderRecentActivityItem,
  };
};

const RecentActivity = () => {
  const {
    headerData,
    itemData,
    renderHeader,
    renderItem,
  } = useRecentActivity();

  const structure = [
    {
      data: headerData,
      renderFunc: renderHeader,
      isSticky: true,
      key: "header1",
    },
    ...itemData.map((node) => {
      return {
        data: node,
        renderFunc: renderItem,
        isSticky: false,
        key: `${node.roomId}`,
      };
    }),
  ];

  return (
    <View style={styles.container}>
      <MixedFlatList data={structure} />
    </View>
  );
};

export default useRecentActivity;

const sortIconSize = 32;
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
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
