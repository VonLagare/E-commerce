import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
} from "../../constants/userConstants";

function userDeleteReducer(state = { user: {} }, action) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_DELETE_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userDeleteReducer;
