import {
  CANCELLED_LIST_REQUEST,
  CANCELLED_LIST_SUCCESS,
  CANCELLED_LIST_ERROR,
  CANCELLED_LIST_CLEAR,
} from "../../constants/orderConstants";

function cancelledOrderReducer(state = { orders: null }, action) {
  switch (action.type) {
    case CANCELLED_LIST_REQUEST:
      return { loading: true };
    case CANCELLED_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case CANCELLED_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case CANCELLED_LIST_CLEAR:
      return {
        orders: null,
      };
    default:
      return state;
  }
}

export default cancelledOrderReducer;
