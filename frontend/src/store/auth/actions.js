import axios from "axios";
import { decode, sign } from "jsonwebtoken";

import setAuthorizationToken from "../../utils/setAuthorizationToken";
import * as actions from "../actionTypes";

export const setCurrentUser = (user) => {
  return {
    type: actions.SET_CURRENT_USER,
    payload: { user },
  };
};

export const login = (data) => {
  return (dispatch) => {
    /* Simulate asking server for a token */

    return axiosDummy("loginURL").then((res) => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      console.log(decode(token));
      dispatch(setCurrentUser(decode(token)));
    });
  };
};

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

const axiosDummy = (url) => {
  return new Promise((resolve, err) => {
    const data = { data: { token: getDummyToken() } };
    setTimeout(() => resolve(data), 1500);
  });
};

const getDummyToken = () => {
  const private_key = "pizza1234";
  const payload = { user: "john" };
  return sign(payload, private_key, { expiresIn: "5s" });
};
