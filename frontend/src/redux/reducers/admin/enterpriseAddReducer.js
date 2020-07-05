import {
  ENTERPRISE_ADD_REQUEST,
  ENTERPRISE_ADD_SUCCESS,
  ENTERPRISE_ADD_ERROR,
} from "../../constants/enterpriseConstants";

function enterpriseAddReducer(state = { enterprise: {} }, action) {
  switch (action.type) {
    case ENTERPRISE_ADD_REQUEST:
      return { loading: true };
    case ENTERPRISE_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        enterprise: action.payload,
      };
    case ENTERPRISE_ADD_ERROR:
      return {
        loading: false,
        success: false,
        enterprise: action.payload,
      };
    default:
      return state;
  }
}

export default enterpriseAddReducer;
