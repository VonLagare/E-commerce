import {
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
} from "../../constants/userConstants";

function userAddReducer(state = { user: {} }, action) {
  switch (action.type) {
    case USER_ADD_REQUEST:
      return { loading: true };
    case USER_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_ADD_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userAddReducer;
