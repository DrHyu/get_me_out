import { StyleSheet } from "react-native";

export const centered = { justifyContent: "center", alignItems: "center" };
export const centeredFull = { ...centered, width: "100%", height: "100%" };

export const row = {
  flexDirection: "row",
  width: "100%",
  marginBottom: 10,
  paddingHorizontal: 10,
  justifyContent: "center",
  alignItems: "center",
};

export const HSeparator = {
  width: "100%",
  height: 0,
  borderBottomWidth: 1,
  borderBottomColor: "black",
};

export default {};
