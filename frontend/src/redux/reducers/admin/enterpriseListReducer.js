import {
  ENTERPRISE_LIST_ERROR,
  ENTERPRISE_LIST_REQUEST,
  ENTERPRISE_LIST_SUCCESS,
} from "../../constants/enterpriseConstants";

function enterpriseListReducer(state = { enterprises: [] }, action) {
  switch (action.type) {
    case ENTERPRISE_LIST_REQUEST:
      return { loading: true, enterprises: [] };
    case ENTERPRISE_LIST_SUCCESS:
      return { loading: false, enterprises: action.payload };
    case ENTERPRISE_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export default enterpriseListReducer;
