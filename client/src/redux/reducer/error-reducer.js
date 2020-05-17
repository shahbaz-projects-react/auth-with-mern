import actionTypes from "../constants/actions.types";
const INITIAL_STATE = {};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
