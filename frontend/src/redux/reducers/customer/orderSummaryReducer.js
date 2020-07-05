import {
  ORDERSUMMARY_LIST_REQUEST,
  ORDERSUMMARY_LIST_SUCCESS,
  ORDERSUMMARY_LIST_ERROR,
} from "../../constants/orderConstants";

function orderSummaryReducer(state = { orders: { products: [] } }, action) {
  switch (action.type) {
    case ORDERSUMMARY_LIST_REQUEST:
      return { loading: true };
    case ORDERSUMMARY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDERSUMMARY_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default orderSummaryReducer;
