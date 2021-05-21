import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN = "AUTH_TOKEN";

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  const jsonValue = await AsyncStorage.getItem(AUTH_TOKEN);
  token =
    jsonValue != null
      ? JSON.parse(jsonValue)
      : { authToken: null, refreshToken: null, id: null };
  return token;
};

export const signIn = (authToken, refreshToken, id) => {
  token = { authToken, refreshToken, id };
  return AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN);
};
