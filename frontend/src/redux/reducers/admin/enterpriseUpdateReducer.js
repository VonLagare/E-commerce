import {
  ENTERPRISE_UPDATE_REQUEST,
  ENTERPRISE_UPDATE_SUCCESS,
  ENTERPRISE_UPDATE_ERROR,
} from "../../constants/enterpriseConstants";

function enterpriseUpdateReducer(state = { enterprise: {} }, action) {
  switch (action.type) {
    case ENTERPRISE_UPDATE_REQUEST:
      return { loading: true };
    case ENTERPRISE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        enterprise: action.payload,
      };
    case ENTERPRISE_UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default enterpriseUpdateReducer;
