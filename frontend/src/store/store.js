import { createStore as reduxCreateStore, applyMiddleware, compose, combineReducers } from "redux";

import { searchReducer } from "./reducers/searchReducers";

import thunk from "redux-thunk";

const composeEnhancers = ( typeof window !== `undefined` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const createStore = () => reduxCreateStore(
  combineReducers({
    search: searchReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default createStore;
