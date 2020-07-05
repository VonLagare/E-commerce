import {
  ORDER_COMPLETE_REQUEST,
  ORDER_COMPLETE_SUCCESS,
  ORDER_COMPLETE_ERROR,
} from "../../constants/orderConstants";

function completeOrderReducer(state = { completed: false }, action) {
  switch (action.type) {
    case ORDER_COMPLETE_REQUEST:
      return { loading: true };
    case ORDER_COMPLETE_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        completed: true,
      };
    case ORDER_COMPLETE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default completeOrderReducer;
