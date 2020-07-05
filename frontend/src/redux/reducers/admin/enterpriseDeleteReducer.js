import {
  ENTERPRISE_DELETE_REQUEST,
  ENTERPRISE_DELETE_SUCCESS,
  ENTERPRISE_DELETE_ERROR,
} from "../../constants/enterpriseConstants";

function enterpriseDeleteReducer(state = { enterprise: {} }, action) {
  switch (action.type) {
    case ENTERPRISE_DELETE_REQUEST:
      return { loading: true };
    case ENTERPRISE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        enterprise: action.payload,
      };
    case ENTERPRISE_DELETE_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default enterpriseDeleteReducer;
