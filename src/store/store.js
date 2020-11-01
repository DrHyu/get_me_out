import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { searchReducer } from "./reducers/searchReducers";

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    search: searchReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
