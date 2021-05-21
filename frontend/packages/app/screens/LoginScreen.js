import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";

import { signIn } from "../utils/asyncStorage";

import { useMutation } from "@apollo/client";
import { tokenAuthMutation } from "@getmeout/common";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("jaume");
  const [password, setPassword] = useState("yoloyolo");

  const [tokenAuth, { data, loading: mutationLoading, error: mutationError }] =
    useMutation(tokenAuthMutation);

  const requestLogin = () => {
    tokenAuth({ variables: { username, password } });
  };

  useEffect(() => {
    if (data?.tokenAuth.success) {
      signIn(
        data.tokenAuth.token,
        data.tokenAuth.refreshToken,
        data.tokenAuth.user.id
      );
      navigation.navigate("ProfileScreen", { userId: data.tokenAuth.user.id });
    }
  }, [data, mutationLoading, mutationError]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.labels}>User</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <Text style={styles.labels}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.labels}>Token</Text>
      <TextInput
        style={styles.input}
        value={data?.tokenAuth?.token}
        editable={false}
      />
      <Pressable style={styles.button} onPress={requestLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      {mutationLoading && <Text>Loading...</Text>}
      {mutationError && <Text>Error :( Please try again</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
    backgroundColor: "#1E272C",
    borderRadius: 8,
    color: "white",
    padding: 8,
  },
  labels: {
    padding: 10,
    fontSize: 16,
    color: "#1E272C",
  },
  button: {
    margin: 16,
    width: 100,
    height: 50,
    backgroundColor: "#1E272C",
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
