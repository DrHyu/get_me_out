import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "./lib/apollo/apolloClient";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TrackScreen from "./screens/TrackScreen";
import SocialScreen from "./screens/SocialScreen";
import RoomEscapeScreen from "./screens/RoomEscapeScreen";
import LoginScreen from "./screens/LoginScreen";

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

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            keyboardHidesTabBar: true,
          }}
        >
          <Tab.Screen
            name="Search"
            component={HomeScreenStackNav}
            options={{
              tabBarLabel: "Search",
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
            name="Profile"
            component={ProfileScreenStackNav}
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
          <Tab.Screen
            name="Social"
            component={SocialScreenStackNav}
            options={{
              tabBarLabel: "Social",
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
            component={RSTrackStackNav}
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
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const HomeStack = createStackNavigator();

const HomeScreenStackNav = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RoomEscapeScreen"
        component={RoomEscapeScreen}
        options={{}}
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const SocialStack = createStackNavigator();

const SocialScreenStackNav = () => {
  return (
    <SocialStack.Navigator initialRouteName="SocialScreen">
      <SocialStack.Screen
        name="SocialScreen"
        component={SocialScreen}
        options={{ headerShown: false }}
      />
      <SocialStack.Screen
        name="RoomEscapeScreen"
        component={RoomEscapeScreen}
        options={{}}
      />
      <SocialStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{}}
      />
      <SocialStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </SocialStack.Navigator>
  );
};

const RSTrackStack = createStackNavigator();

const RSTrackStackNav = () => {
  return (
    <RSTrackStack.Navigator initialRouteName="TrackScreen">
      <RSTrackStack.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{ headerShown: false }}
      />
      <RSTrackStack.Screen
        name="RoomEscapeScreen"
        component={RoomEscapeScreen}
        options={{}}
      />
      <RSTrackStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </RSTrackStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileScreenStackNav = () => {
  return (
    <ProfileStack.Navigator initialRouteName="LoginScreen">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="RoomEscapeScreen"
        component={RoomEscapeScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

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
