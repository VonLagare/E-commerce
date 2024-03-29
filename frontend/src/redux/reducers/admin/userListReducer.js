import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
} from "../../constants/userConstants";

function userListReducer(state = { users: [] }, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export default userListReducer;
