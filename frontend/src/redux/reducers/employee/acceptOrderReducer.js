import {
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_ACCEPT_ERROR,
} from "../../constants/orderConstants";

function acceptOrderReducer(state = { accepted: false }, action) {
  switch (action.type) {
    case ORDER_ACCEPT_REQUEST:
      return { loading: true };
    case ORDER_ACCEPT_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        accepted: true,
      };
    case ORDER_ACCEPT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default acceptOrderReducer;
