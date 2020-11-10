import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import { searchReducer } from "./reducers/searchReducers";
import { dashboardReducer } from "./reducers/dashboardReducers";
import { authReducer } from "./reducers/authReducer";

import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== `undefined` &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const createStore = () =>
  reduxCreateStore(
    combineReducers({
      dashboard: dashboardReducer,
      search: searchReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

export default createStore;
