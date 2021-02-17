import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "./lib/apollo/apolloClient";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TrackScreen from "./screens/TrackScreen";
import EventFeedScreen from "./screens/EventFeedScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function App() {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Search"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="rocket-launch-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Events"
            component={EventFeedScreen}
            options={{
              tabBarLabel: "Updates",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="bell-outline"
                  color={color}
                  size={size}
                />
              ),
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="Track"
            component={TrackScreen}
            options={{
              tabBarLabel: "My List",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="format-list-numbered"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Me",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
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
