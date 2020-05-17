import actionTypes from "../constants/actions.types";
const isEmpty = require("is-empty");
const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  loading: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
