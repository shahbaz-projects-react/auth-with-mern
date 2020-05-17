import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const INITIAL_STATE = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(...middleware)
);
export default store;
