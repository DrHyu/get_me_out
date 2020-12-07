import { decode, sign } from "jsonwebtoken";

import setAuthorizationToken from "../../utils/setAuthorizationToken";
import * as actions from "../actionTypes";

const getDummyToken = () => {
  const privateKey = "pizza1234";
  const payload = { user: "john" };
  return sign(payload, privateKey, { expiresIn: "5s" });
};

// eslint-disable-next-line no-unused-vars
const axiosDummy = (url) =>
  new Promise((resolve) => {
    const data = { data: { token: getDummyToken() } };
    setTimeout(() => resolve(data), 1500);
  });

export const setCurrentUser = (user) => ({
  type: actions.SET_CURRENT_USER,
  payload: { user },
});

export const login = () => (dispatch) =>
  /* Simulate asking server for a token */

  axiosDummy("loginURL").then((res) => {
    const { token } = res.data;
    // eslint-disable-next-line no-undef
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(decode(token)));
  });

export function logout() {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
