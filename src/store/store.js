import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { searchReducer } from "./reducers/searchReducers";

import thunk from "redux-thunk";

const INITIAL_STATE = {};
const store = createStore(
  combineReducers({
    search: searchReducer,
  }),
  INITIAL_STATE,
  compose(applyMiddleware(thunk))
);

export default store;
