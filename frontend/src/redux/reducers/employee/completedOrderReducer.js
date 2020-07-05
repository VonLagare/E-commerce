import {
  COMPLETED_LIST_REQUEST,
  COMPLETED_LIST_SUCCESS,
  COMPLETED_LIST_ERROR,
  COMPLETED_LIST_CLEAR,
} from "../../constants/orderConstants";

function completedOrderReducer(state = { orders: null }, action) {
  switch (action.type) {
    case COMPLETED_LIST_REQUEST:
      return { loading: true };
    case COMPLETED_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case COMPLETED_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPLETED_LIST_CLEAR:
      return {
        orders: null,
      };
    default:
      return state;
  }
}

export default completedOrderReducer;
