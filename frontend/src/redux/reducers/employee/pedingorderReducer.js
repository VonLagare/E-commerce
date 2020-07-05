import {
  PENDINGORDER_LIST_REQUEST,
  PENDINGORDER_LIST_SUCCESS,
  PENDINGORDER_LIST_ERROR,
  PENDINGORDER_LIST_CLEAR,
} from "../../constants/orderConstants";

function pendingorderReducer(state = { orders: null }, action) {
  switch (action.type) {
    case PENDINGORDER_LIST_REQUEST:
      return { loading: true };
    case PENDINGORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case PENDINGORDER_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case PENDINGORDER_LIST_CLEAR:
      return {
        orders: null,
      };
    default:
      return state;
  }
}

export default pendingorderReducer;
